import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const FORMCARRY_URL = 'https://formcarry.com/s/YOUR_FORM_ID'

const isValidPhone = (value) => /^\+?[0-9\s\-()]{7,}$/.test(value)
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)

function validate(values) {
    const errors = { name: '', phone: '', email: '', consent: '' }

    if (!String(values.name || '').trim())
        errors.name = 'contact.form.errors.nameRequired'
    if (!isValidPhone(String(values.phone || '').trim()))
        errors.phone = 'contact.form.errors.phoneInvalid'
    if (!isValidEmail(String(values.email || '').trim()))
        errors.email = 'contact.form.errors.emailInvalid'
    if (!values.consent) errors.consent = 'contact.form.errors.consentRequired'

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
            const res = await fetch(FORMCARRY_URL, {
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
                }),
            })

            if (!res.ok) throw new Error('Request failed')
            return true
        } catch {
            return rejectWithValue({
                kind: 'network',
                messageKey: 'contact.form.errors.submitFailed',
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
    status: 'idle', // idle | loading | success | error | invalid
    submitErrorMessageKey: '',
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitContactForm.pending, (state) => {
                state.status = 'loading'
                state.submitErrorMessageKey = ''
            })
            .addCase(submitContactForm.fulfilled, (state) => {
                state.status = 'success'
                state.errors = { name: '', phone: '', email: '', consent: '' }
                state.submitErrorMessageKey = ''
            })
            .addCase(submitContactForm.rejected, (state, action) => {
                const payload = action.payload
                if (payload?.kind === 'validation') {
                    state.status = 'invalid'
                    state.errors = payload.errors
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
