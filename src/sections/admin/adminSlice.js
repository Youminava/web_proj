import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_USERS_URL } from '../../config'
import { validate } from '../contact/contactFormSlice'

function basicAuth(login, password) {
    return 'Basic ' + btoa(`${login}:${password}`)
}

function hasErrors(errors) {
    return Boolean(errors.name || errors.phone || errors.email)
}

const emptyEdit = { name: '', phone: '', email: '', comment: '' }
const emptyEditErrors = { name: '', phone: '', email: '' }

export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (_, { getState, rejectWithValue }) => {
        const { login, password } = getState().admin.credentials
        if (!login.trim() || !password.trim()) {
            return rejectWithValue('Введите логин и пароль')
        }
        try {
            const res = await fetch(API_USERS_URL, {
                headers: { Authorization: basicAuth(login.trim(), password.trim()) },
            })
            if (res.status === 401) return rejectWithValue('Неверный логин или пароль администратора')
            if (!res.ok) throw new Error('Request failed')
            const data = await res.json()
            return data.users || []
        } catch {
            return rejectWithValue('Ошибка соединения с сервером')
        }
    },
)

export const deleteUser = createAsyncThunk(
    'admin/delete',
    async (id, { getState, rejectWithValue }) => {
        const { login, password } = getState().admin.credentials
        try {
            const res = await fetch(`${API_USERS_URL}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: basicAuth(login.trim(), password.trim()) },
            })
            if (!res.ok) throw new Error('Request failed')
            return id
        } catch {
            return rejectWithValue('Не удалось удалить заявку')
        }
    },
)

export const saveUser = createAsyncThunk(
    'admin/save',
    async ({ id }, { getState, rejectWithValue }) => {
        const { credentials, editValues } = getState().admin

        const trimmed = {
            name: String(editValues.name || '').trim(),
            phone: String(editValues.phone || '').trim(),
            email: String(editValues.email || '').trim(),
            comment: String(editValues.comment || '').trim(),
            consent: true,
        }

        const errors = validate(trimmed)
        if (hasErrors(errors)) {
            return rejectWithValue({ kind: 'validation', errors })
        }

        try {
            const res = await fetch(`${API_USERS_URL}/${id}`, {
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
    users: [],
    actionError: '',
    editingId: null,
    editValues: { ...emptyEdit },
    editErrors: { ...emptyEditErrors },
    savingId: null,
    deletingId: null,
}

const adminSlice = createSlice({
    name: 'admin',
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
        startEdit(state, action) {
            const user = action.payload
            state.editingId = user.id
            state.editValues = {
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || '',
                comment: user.comment || '',
            }
            state.editErrors = { ...emptyEditErrors }
            state.actionError = ''
        },
        setEditField(state, action) {
            const { field, value } = action.payload
            state.editValues[field] = value
            if (state.editErrors[field] !== undefined) state.editErrors[field] = ''
        },
        cancelEdit(state) {
            state.editingId = null
            state.editValues = { ...emptyEdit }
            state.editErrors = { ...emptyEditErrors }
        },
        logout() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.authStatus = 'loading'
                state.authError = ''
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.authStatus = 'authorized'
                state.users = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.authStatus = 'error'
                state.authError = action.payload || 'Ошибка авторизации'
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.deletingId = action.meta.arg
                state.actionError = ''
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.deletingId = null
                state.users = state.users.filter((u) => u.id !== action.payload)
                if (state.editingId === action.payload) state.editingId = null
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.deletingId = null
                state.actionError = action.payload || 'Не удалось удалить заявку'
            })
            .addCase(saveUser.pending, (state, action) => {
                state.savingId = action.meta.arg.id
                state.actionError = ''
            })
            .addCase(saveUser.fulfilled, (state, action) => {
                state.savingId = null
                const updated = action.payload
                state.users = state.users.map((u) =>
                    u.id === updated.id ? { ...u, ...updated } : u,
                )
                state.editingId = null
                state.editValues = { ...emptyEdit }
                state.editErrors = { ...emptyEditErrors }
            })
            .addCase(saveUser.rejected, (state, action) => {
                state.savingId = null
                const payload = action.payload
                if (payload?.kind === 'validation') {
                    state.editErrors = { ...emptyEditErrors, ...payload.errors }
                    return
                }
                state.actionError =
                    payload?.kind === 'network' ? 'Ошибка сохранения' : 'Сессия истекла, войдите снова'
            })
    },
})

export const { setCredField, startEdit, setEditField, cancelEdit, logout } = adminSlice.actions
export const adminReducer = adminSlice.reducer
