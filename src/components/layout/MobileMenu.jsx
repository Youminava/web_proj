import React from 'react'
import { mobileNavItems } from '../../data/navigation'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'

export function MobileMenu({ isOpen, onClose, onContactClick }) {
    const { t } = useTranslation()
    const currentLng = i18n.language === 'en' ? 'en' : 'ru'
    return (
        <div className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}>
            <div className="mobile-menu__backdrop" onClick={onClose} />

            <div className="mobile-menu__panel">
                <button
                    type="button"
                    className="mobile-menu__close"
                    onClick={onClose}
                    aria-label={t('mobileMenu.close')}
                >
                    ✕
                </button>

                <nav className="mobile-menu__nav">
                    {mobileNavItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="mobile-menu__link"
                            onClick={onClose}
                        >
                            {t(item.labelKey)}
                        </a>
                    ))}
                </nav>

                <div className="mobile-menu__lang">
                    <div className="mobile-menu__lang-label">{t('header.language')}</div>
                    <div className="mobile-menu__lang-actions">
                        <button
                            type="button"
                            className={
                                'mobile-menu__lang-btn' +
                                (currentLng === 'ru' ? ' mobile-menu__lang-btn--active' : '')
                            }
                            onClick={() => i18n.changeLanguage('ru')}
                        >
                            {t('lang.ru')}
                        </button>
                        <button
                            type="button"
                            className={
                                'mobile-menu__lang-btn' +
                                (currentLng === 'en' ? ' mobile-menu__lang-btn--active' : '')
                            }
                            onClick={() => i18n.changeLanguage('en')}
                        >
                            {t('lang.en')}
                        </button>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn mobile-menu__contact-btn"
                    onClick={onContactClick}
                >
                    {t('mobileMenu.contact')}
                </button>
            </div>
        </div>
    )
}
