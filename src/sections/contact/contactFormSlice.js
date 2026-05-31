import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_USERS_URL } from '../../config'

const isValidPhone = (value) => /^\+[0-9\s\-()]{7,}$/.test(value)
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

export function validate(values) {
    const errors = { name: '', phone: '', email: '', consent: '' }

    if (!String(values.name || '').trim())
        errors.name = 'Имя обязательно'
    const phoneValue = String(values.phone || '').trim()
    if (!phoneValue) {
        errors.phone = 'Номер телефона обязателен'
    } else if (!phoneValue.startsWith('+')) {
        errors.phone = 'Номер телефона должен начинаться с +'
    } else if (!isValidPhone(phoneValue)) {
        errors.phone = 'Неверный формат номера телефона'
    }
    if (!isValidEmail(String(values.email || '').trim()))
        errors.email = 'Неверный email'
    if (!values.consent) errors.consent = 'Необходимо согласие'

    return errors
}

function hasErrors(errors) {
    return Boolean(errors.name || errors.phone || errors.email || errors.consent)
}

export const submitContactForm = createAsyncThunk(
    'contactForm/submit',
    async (_, { getState, rejectWithValue }) => {
        const { values } = getState().contactForm

        const trimmedValues = {
            name: String(values.name || '').trim(),
            phone: String(values.phone || '').trim(),
            email: String(values.email || '').trim(),
            comment: String(values.comment || '').trim(),
            consent: Boolean(values.consent),
        }

        const errors = validate(trimmedValues)
        if (hasErrors(errors)) {
            return rejectWithValue({ kind: 'validation', errors })
        }

        try {
            const res = await fetch(API_USERS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: trimmedValues.name,
                    phone: trimmedValues.phone,
                    email: trimmedValues.email,
                    comment: trimmedValues.comment,
                    consent: trimmedValues.consent,
                }),
            })

            if (res.status === 422) {
                const data = await res.json()
                return rejectWithValue({ kind: 'validation', errors: data.errors || {} })
            }

            if (!res.ok) throw new Error('Request failed')

            const data = await res.json()
            const id = String(data.profile || '').split('/').pop()
            return {
                login: data.login,
                password: data.password,
                profileUrl: `/profile/${id}`,
            }
        } catch {
            return rejectWithValue({
                kind: 'network',
                messageKey: 'Ошибка отправки формы',
            })
        }
    },
)

export const contactFormInitialState = {
    values: {
        name: '',
        phone: '',
        email: '',
        comment: '',
        consent: true,
    },
    errors: { name: '', phone: '', email: '', consent: '' },
    status: 'idle',
    submitErrorMessageKey: '',
    result: null,
}

const contactFormSlice = createSlice({
    name: 'contactForm',
    initialState: contactFormInitialState,
    reducers: {
        setField(state, action) {
            const { field, value } = action.payload
            state.values[field] = value
            if (state.errors[field] !== undefined) state.errors[field] = ''
            if (state.status === 'success') state.status = 'idle'
        },
        setConsent(state, action) {
            state.values.consent = Boolean(action.payload)
            state.errors.consent = ''
            if (state.status === 'success') state.status = 'idle'
        },
        clearSubmitState(state) {
            state.status = 'idle'
            state.submitErrorMessageKey = ''
            state.result = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.status = 'loading'
                state.submitErrorMessageKey = ''
                state.result = null
            })
            .addCase(submitContactForm.fulfilled, (state, action) => {
                state.status = 'success'
                state.errors = { name: '', phone: '', email: '', consent: '' }
                state.submitErrorMessageKey = ''
                state.result = action.payload
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                const payload = action.payload
                if (payload?.kind === 'validation') {
                    state.status = 'invalid'
                    state.errors = {
                        name: '',
                        phone: '',
                        email: '',
                        consent: '',
                        ...payload.errors,
                    }
                    state.submitErrorMessageKey = ''
                    return
                }

                state.status = 'error'
                state.submitErrorMessageKey =
                    payload?.messageKey || 'contact.form.errors.submitFailed'
            })
    },
})

export const { setField, setConsent, clearSubmitState } = contactFormSlice.actions
export const contactFormReducer = contactFormSlice.reducer
