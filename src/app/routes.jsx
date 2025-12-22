import React, { useCallback } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Home } from '../pages/Home'
import { MobileMenu } from '../components/layout/MobileMenu'
import { ContactModal } from '../sections/contact/ContactModal'
import {
    closeMobileMenu,
    openMobileMenu,
    setContactModalOrigin,
} from './slices/uiSlice'

function HomeLayout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const isMenuOpen = useSelector((s) => s.ui.mobileMenuOpen)

    const handleBurgerClick = useCallback(() => {
        dispatch(openMobileMenu())
    }, [dispatch])

    const handleMenuClose = useCallback(() => {
        dispatch(closeMobileMenu())
    }, [dispatch])

    const handleContactClick = useCallback(
        (event) => {
            dispatch(closeMobileMenu())

            const rect = event?.currentTarget?.getBoundingClientRect?.()
            if (rect) {
                dispatch(
                    setContactModalOrigin({
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                    }),
                )
            } else {
                dispatch(setContactModalOrigin(null))
            }

            navigate('/contact', { state: { backgroundLocation: location } })
        },
        [dispatch, navigate, location],
    )

    return (
        <>
            <Home onBurgerClick={handleBurgerClick} onContactClick={handleContactClick} />
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                onContactClick={handleContactClick}
            />
        </>
    )
}

export function AppRoutes() {
    const location = useLocation()
    const state = location.state
    const backgroundLocation = state?.backgroundLocation

    return (
        <>
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<HomeLayout />} />
                <Route path="/contact" element={<HomeLayout />} />
            </Routes>

            <Routes>
                <Route path="/contact" element={<ContactModal />} />
            </Routes>
        </>
    )
}
