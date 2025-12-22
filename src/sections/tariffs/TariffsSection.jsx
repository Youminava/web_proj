import React from 'react'
import { tariffs } from '../../data/tariffs'
import { useTranslation } from 'react-i18next'

export function TariffsSection() {
    const { t } = useTranslation()
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
                <h2 className="tariffs__title">{t('tariffs.title')}</h2>

                <div className="tariffs__cards">
                    {tariffs.map((tariff, idx) => (
                        <article
                            key={idx}
                            className={
                                `tariff-card tariff-card--${idx + 1}` +
                                (tariff.type === 'primary' ? ' tariff-card--primary' : '')
                            }
                        >
                            <div className="tariff-card__header">
                                <p className="tariff-card__name">{t(tariff.nameKey)}</p>
                                <p className="tariff-card__price">
                  <span className="tariff-card__price-value">
                    {tariff.price}
                  </span>
                                    <span className="tariff-card__price-currency"> ₽</span>
                                </p>
                                <p className="tariff-card__note">{t(tariff.noteKey)}</p>
                            </div>

                            <ul className="tariff-card__list">
                                {tariff.featureKeys.map((f, i) => (
                                    <li key={i} className="tariff-card__item">
                                        <span className="tariff-card__bullet" />
                                        <span>{t(f)}</span>
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
                                {t(tariff.buttonTextKey)}
                            </button>
                        </article>
                    ))}
                </div>

                <div className="tariffs__footer">
                    <p className="tariffs__footer-text">
                        <span className="tariffs__footer-line tariffs__footer-line--first">
                            {t('tariffs.footer.line1')}
                        </span>
                        <span className="tariffs__footer-line tariffs__footer-line--second">
                            {t('tariffs.footer.line2')}
                        </span>
                        <span className="tariffs__footer-line tariffs__footer-line--third">
                            {t('tariffs.footer.line3')}
                        </span>
                    </p>
                    <button className="tariffs__footer-link" onClick={goToContacts}>
                        {t('tariffs.footer.link')}
                    </button>
                </div>
            </div>
        </section>
    )
}
