import React from 'react'
import { cases } from '../../data/cases'
import { useTranslation } from 'react-i18next'

export function CasesSection() {
    const { t } = useTranslation()
    return (
        <section id="cases" className="cases">
            <div className="container">
                <h2 className="cases__title">{t('cases.title')}</h2>

                <div className="cases__grid">
                    {cases.map((caseItem) => {
                        if (caseItem.variant === 'wide') {
                            return (
                                <article
                                    key={caseItem.id}
                                    className="case-card case-card--image case-card--wide"
                                    style={{ gridColumn: 'span 2' }}
                                >
                                    <div className="case-card__image-wrapper">
                                        <img src={caseItem.image} alt="" className="case-card__image" />
                                        <div className="case-card__overlay case-card__overlay--wide" />
                                    </div>
                                    <div className="case-card__content case-card__content--wide">
                                        <h3 className="case-card__title">{t(caseItem.titleKey)}</h3>
                                    </div>
                                </article>
                            )
                        }

                        if (caseItem.variant === 'vertical') {
                            return (
                                <article
                                    key={caseItem.id}
                                    className="case-card case-card--image case-card--vertical"
                                    style={{ gridColumn: 'span 1' }}
                                >
                                    <div className="case-card__image-wrapper">
                                        <img src={caseItem.image} alt="" className="case-card__image" />
                                        <div className="case-card__overlay case-card__overlay--vertical" />
                                    </div>
                                    <div className="case-card__content case-card__content--vertical">
                                        <h3 className="case-card__title">{t(caseItem.titleKey)}</h3>
                                        <p className="case-card__date">{caseItem.date}</p>
                                    </div>
                                </article>
                            )
                        }

                        return (
                            <article
                                key={caseItem.id}
                                className="case-card case-card--description"
                                style={{ gridColumn: 'span 1' }}
                            >
                                <div className="case-card__image-wrapper case-card__image-wrapper--description">
                                    <img src={caseItem.image} alt="" className="case-card__image" />
                                </div>
                                <div className="case-card__content case-card__content--description">
                                    <h3 className="case-card__title case-card__title--dark">{t(caseItem.titleKey)}</h3>
                                    <p className="case-card__date case-card__date--dark">{caseItem.date}</p>
                                    {caseItem.descriptionKey && (
                                        <p className="case-card__description case-card__description--dark">
                                            {t(caseItem.descriptionKey)}
                                        </p>
                                    )}
                                </div>
                            </article>
                        )
                    })}
                </div>

                <div className="cases__footer">
                    <button className="cases__show-more" type="button">
                        {t('cases.showMore')}
                    </button>
                </div>
            </div>
        </section>
    )
}
