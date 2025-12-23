import React from 'react'
import { mobileNavItems, mobileNavItemsEn } from '../../data/navigation'
import logo from '../../assets/img/logo.png'
import { useLanguage } from '../../contexts/LanguageContext'

export function MobileMenu({ isOpen, onClose, onContactClick }) {
    const { language } = useLanguage()
    const currentNavItems = language === 'ru' ? mobileNavItems : mobileNavItemsEn
    return (
        <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
            <div className="mobile-menu__backdrop" onClick={onClose} />

            <div className="mobile-menu__panel">
                <div className="mobile-menu__header">
                    <img src={logo} alt="Logo" className="mobile-menu__logo" />
                    <button
                        type="button"
                        className="mobile-menu__close"
                        onClick={onClose}
                        aria-label="Закрыть меню"
                    >
                        ✕
                    </button>
                </div>

                <nav className="mobile-menu__nav">
                    {currentNavItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="mobile-menu__link"
                            onClick={onClose}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="mobile-menu__footer">
                    <button
                        type="button"
                        className="btn mobile-menu__contact-btn"
                        onClick={onContactClick}
                    >
                        Связь с нами
                    </button>
                </div>
            </div>
        </div>
    )
}
