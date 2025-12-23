import React, { useState } from 'react'
import logo from '../../assets/img/drupal-coder.svg'
import { mainNavItems, mainNavItemsEn } from '../../data/navigation'
import { useLanguage } from '../../contexts/LanguageContext'

export function Header({
                           activeSection = 'support',
                           onNavClick,
                           onBurgerClick,
                       }) {

    const { language, toggleLanguage } = useLanguage()
    const [showEn, setShowEn] = useState(false)
    const currentNavItems = language === 'ru' ? mainNavItems : mainNavItemsEn

    const handleNavClick = (e, item) => {
        if (onNavClick) {
            e.preventDefault()
            onNavClick(item)
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        window.location.reload()
    }

    const handleLanguageToggle = (newLang) => {
        if (newLang !== language) {
            toggleLanguage()
        }
    }

    const toggleShowEn = () => {
        setShowEn(!showEn)
    }

    return (
        <header className="header">
            <div className="container header__inner">

                
                <div className="header__left">
                    <a
                        href={import.meta.env.BASE_URL || '/'}
                        className="header__logo"
                        onClick={handleLogoClick}
                    >
                        <img src={logo} alt="Drupal-coder" />
                    </a>
                </div>

                
                <nav className="header__nav header__nav--desktop">
                    {currentNavItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={
                                'header__link' +
                                (item.id === activeSection ? ' header__link--active' : '')
                            }
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                
                <div className="header__right">
                    <a href="tel:88002222673" className="header__phone">
                        8 800 222-26-73
                    </a>
                    
                    <div className="header__lang-simple">
                        <div className="header__lang-current">
                            <button
                                type="button"
                                className="header__lang-option header__lang-option--active"
                                onClick={() => handleLanguageToggle('ru')}
                            >
                                RU
                            </button>
                            <button
                                type="button"
                                className="header__lang-toggle-arrow"
                                onClick={toggleShowEn}
                                aria-label="Показать языки"
                            >
                                <svg 
                                    className={`header__lang-arrow ${showEn ? 'header__lang-arrow--open' : ''}`}
                                    width="12" 
                                    height="8" 
                                    viewBox="0 0 12 8" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        {showEn && (
                            <button
                                type="button"
                                className="header__lang-option"
                                onClick={() => handleLanguageToggle('en')}
                            >
                                EN
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        className="header__burger"
                        aria-label="Открыть меню"
                        onClick={onBurgerClick}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    )
}
