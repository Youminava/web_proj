import React from 'react'
import { tariffs, tariffsEn, tariffsTitle, tariffsTitleEn, tariffsFooterText, tariffsFooterTextEn, tariffsFooterLink, tariffsFooterLinkEn } from '../../data/tariffs'
import { useLanguage } from '../../contexts/LanguageContext'

export function TariffsSection() {
    const { language } = useLanguage()
    const isEnglish = language === 'en'
    
    const tariffsData = isEnglish ? tariffsEn : tariffs
    const title = isEnglish ? tariffsTitleEn : tariffsTitle
    const footerText = isEnglish ? tariffsFooterTextEn : tariffsFooterText
    const footerLink = isEnglish ? tariffsFooterLinkEn : tariffsFooterLink
    
    const goToContacts = () => {
        const el = document.getElementById('contacts')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
        }
        window.location.hash = 'contacts'
    }

    return (
        <section id="tariffs" className="section tariffs">
            <div className="container">
                <h2 className="tariffs__title">{title}</h2>

                <div className="tariffs__cards">
                    {tariffsData.map((tariff, idx) => (
                        <article
                            key={idx}
                            className={
                                `tariff-card tariff-card--${idx + 1}` +
                                (tariff.type === 'primary' ? ' tariff-card--primary' : '')
                            }
                        >
                            <div className="tariff-card__header">
                                <p className="tariff-card__name">{tariff.name}</p>
                                <p className="tariff-card__price">
                  <span className="tariff-card__price-value">
                    {tariff.price}
                  </span>
                                    <span className="tariff-card__price-currency"> ₽</span>
                                </p>
                                <p className="tariff-card__note">{tariff.note}</p>
                            </div>

                            <ul className="tariff-card__list">
                                {tariff.features.map((f, i) => (
                                    <li key={i} className="tariff-card__item">
                                        <span className="tariff-card__bullet" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className={
                                    'btn tariff-card__btn' +
                                    (tariff.type === 'primary' ? ' tariff-card__btn--filled' : ' btn--outline')
                                }
                                onClick={goToContacts}
                            >
                                {tariff.buttonText}
                            </button>
                        </article>
                    ))}
                </div>

                <div className="tariffs__footer">
                    <p className="tariffs__footer-text">
                        <span className="tariffs__footer-line tariffs__footer-line--first">
                            {footerText}
                        </span>
                    </p>
                    <button className="tariffs__footer-link" onClick={goToContacts}>
                        {footerLink}
                    </button>
                </div>
            </div>
        </section>
    )
}
