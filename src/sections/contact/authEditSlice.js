import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ORIGIN } from '../../config'
import { validate } from './contactFormSlice'

function basicAuth(login, password) {
    return 'Basic ' + btoa(`${login}:${password}`)
}

function hasErrors(errors) {
    return Boolean(errors.name || errors.phone || errors.email)
}

export const authenticate = createAsyncThunk(
    'authEdit/authenticate',
    async (arg, { getState, rejectWithValue }) => {
        const expectedId = arg?.expectedId
        const { login, password } = getState().authEdit.credentials
        if (!login.trim() || !password.trim()) {
            return rejectWithValue('Введите логин и пароль')
        }
        try {
            const res = await fetch(`${API_ORIGIN}/me`, {
                headers: { Authorization: basicAuth(login.trim(), password.trim()) },
            })
            if (res.status === 401) return rejectWithValue('Неверный логин или пароль')
            if (!res.ok) throw new Error('Request failed')
            const user = await res.json()
            if (expectedId != null && Number(user.id) !== Number(expectedId)) {
                return rejectWithValue('Эти учётные данные не от этого профиля')
            }
            return user
        } catch {
            return rejectWithValue('Ошибка соединения с сервером')
        }
    },
)

export const saveEdits = createAsyncThunk(
    'authEdit/saveEdits',
    async (_, { getState, rejectWithValue }) => {
        const { credentials, user, values } = getState().authEdit

        const trimmed = {
            name: String(values.name || '').trim(),
            phone: String(values.phone || '').trim(),
            email: String(values.email || '').trim(),
            comment: String(values.comment || '').trim(),
            consent: true,
        }

        const errors = validate(trimmed)
        if (hasErrors(errors)) {
            return rejectWithValue({ kind: 'validation', errors })
        }

        try {
            const res = await fetch(`${API_ORIGIN}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: basicAuth(credentials.login.trim(), credentials.password.trim()),
                },
                body: JSON.stringify(trimmed),
            })
            if (res.status === 422) {
                const data = await res.json()
                return rejectWithValue({ kind: 'validation', errors: data.errors || {} })
            }
            if (res.status === 401) return rejectWithValue({ kind: 'auth' })
            if (!res.ok) throw new Error('Request failed')
            return await res.json()
        } catch {
            return rejectWithValue({ kind: 'network' })
        }
    },
)

const initialState = {
    credentials: { login: '', password: '' },
    authStatus: 'idle',
    authError: '',
    user: null,
    values: { name: '', phone: '', email: '', comment: '' },
    errors: { name: '', phone: '', email: '' },
    saveStatus: 'idle',
    saveError: '',
}

const authEditSlice = createSlice({
    name: 'authEdit',
    initialState,
    reducers: {
        setCredField(state, action) {
            const { field, value } = action.payload
            state.credentials[field] = value
            if (state.authStatus === 'error') {
                state.authStatus = 'idle'
                state.authError = ''
            }
        },
        setEditField(state, action) {
            const { field, value } = action.payload
            state.values[field] = value
            if (state.errors[field] !== undefined) state.errors[field] = ''
            if (state.saveStatus === 'saved') state.saveStatus = 'idle'
        },
        logout() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                state.authStatus = 'loading'
                state.authError = ''
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.authStatus = 'authorized'
                state.user = action.payload
                state.values = {
                    name: action.payload.name,
                    phone: action.payload.phone,
                    email: action.payload.email,
                    comment: action.payload.comment || '',
                }
                state.errors = { name: '', phone: '', email: '' }
                state.saveStatus = 'idle'
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.authStatus = 'error'
                state.authError = action.payload || 'Ошибка авторизации'
            })
            .addCase(saveEdits.pending, (state) => {
                state.saveStatus = 'saving'
                state.saveError = ''
            })
            .addCase(saveEdits.fulfilled, (state, action) => {
                state.saveStatus = 'saved'
                state.values = {
                    name: action.payload.name,
                    phone: action.payload.phone,
                    email: action.payload.email,
                    comment: action.payload.comment || '',
                }
            })
            .addCase(saveEdits.rejected, (state, action) => {
                const payload = action.payload
                if (payload?.kind === 'validation') {
                    state.saveStatus = 'idle'
                    state.errors = { name: '', phone: '', email: '', ...payload.errors }
                    return
                }
                state.saveStatus = 'error'
                state.saveError =
                    payload?.kind === 'auth' ? 'Сессия истекла, войдите снова' : 'Ошибка сохранения'
            })
    },
})

export const { setCredField, setEditField, logout } = authEditSlice.actions
export const authEditReducer = authEditSlice.reducer