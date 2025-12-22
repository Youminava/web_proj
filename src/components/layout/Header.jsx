import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/img/drupal-coder.svg'
import { contactPhone, contactPhoneHref } from '../../data/contact'
import { mainNavItems } from '../../data/navigation'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export function Header({
                           activeSection = 'support',
                           onNavClick,
                           onBurgerClick,
                           onLangClick,
                       }) {
    const { t } = useTranslation()
    const [isLangOpen, setIsLangOpen] = useState(false)
    const langWrapRef = useRef(null)

    const currentLang = i18n.language === 'en' ? 'en' : 'ru'
    const otherLang = currentLang === 'ru' ? 'en' : 'ru'
    const currentLangLabel = t(`lang.${currentLang}`)

    useEffect(() => {
        const onDocClick = (e) => {
            if (!langWrapRef.current) return
            if (langWrapRef.current.contains(e.target)) return
            setIsLangOpen(false)
        }
        document.addEventListener('click', onDocClick)
        return () => document.removeEventListener('click', onDocClick)
    }, [])

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
                    {mainNavItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={
                                'header__link' +
                                (item.id === activeSection ? ' header__link--active' : '')
                            }
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {t(item.labelKey)}
                        </a>
                    ))}
                </nav>

                
                <div className="header__right">
                    <a href={contactPhoneHref} className="header__phone">
                        {contactPhone}
                    </a>

                    <div className="header__lang-wrap" ref={langWrapRef}>
                        <button
                            type="button"
                            className="header__lang"
                            aria-label={t('header.language')}
                            onClick={() => setIsLangOpen((v) => !v)}
                        >
                            <span className="header__lang-text">{currentLangLabel}</span>
                            <svg
                                className="header__lang-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="9"
                                height="6"
                                viewBox="0 0 9 6"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M0.707031 0.707092L4.20703 4.20709L7.70703 0.707092"
                                    stroke="white"
                                    strokeWidth="2"
                                    opacity="0.24"
                                />
                            </svg>
                        </button>

                        {isLangOpen && (
                            <div className="header__lang-menu" role="menu">
                                <button
                                    type="button"
                                    className="header__lang-item"
                                    role="menuitem"
                                    onClick={() => {
                                        i18n.changeLanguage(otherLang)
                                        setIsLangOpen(false)
                                        if (onLangClick) onLangClick(otherLang)
                                    }}
                                >
                                    {t(`lang.${otherLang}`)}
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="header__burger"
                        aria-label={t('header.openMenu')}
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
