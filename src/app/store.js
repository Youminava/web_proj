import { configureStore } from '@reduxjs/toolkit'
import { uiReducer } from './slices/uiSlice'
import {
    contactFormInitialState,
    contactFormReducer,
} from '../sections/contact/contactFormSlice'
import { authEditReducer } from '../sections/contact/authEditSlice'
import { adminReducer } from '../sections/admin/adminSlice'

const CONTACT_FORM_STORAGE_KEY = 'contactForm.v1'

function loadContactFormValues() {
    try {
        const raw = localStorage.getItem(CONTACT_FORM_STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (!parsed || typeof parsed !== 'object') return null
        return parsed
    } catch {
        return null
    }
}

function saveContactFormValues(values) {
    try {
        localStorage.setItem(CONTACT_FORM_STORAGE_KEY, JSON.stringify(values))
    } catch {
        return
    }
}

const preloadedContactValues = loadContactFormValues()
const preloadedContactFormState = preloadedContactValues
    ? { ...contactFormInitialState, values: { ...contactFormInitialState.values, ...preloadedContactValues } }
    : undefined

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        contactForm: contactFormReducer,
        authEdit: authEditReducer,
        admin: adminReducer,
    },
    preloadedState: preloadedContactFormState
        ? { contactForm: preloadedContactFormState }
        : undefined,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat((storeApi) => (next) => (action) => {
            const result = next(action)

            if (action.type.startsWith('contactForm/')) {
                const { values } = storeApi.getState().contactForm
                saveContactFormValues(values)
            }

            return result
        }),
})
