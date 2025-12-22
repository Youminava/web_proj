import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        mobileMenuOpen: false,
        contactModalOrigin: null,
    },
    reducers: {
        openMobileMenu(state) {
            state.mobileMenuOpen = true
        },
        closeMobileMenu(state) {
            state.mobileMenuOpen = false
        },
        setContactModalOrigin(state, action) {
            state.contactModalOrigin = action.payload
        },
    },
})

export const { openMobileMenu, closeMobileMenu, setContactModalOrigin } = uiSlice.actions
export const uiReducer = uiSlice.reducer

