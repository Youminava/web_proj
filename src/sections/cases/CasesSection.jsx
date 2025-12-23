import React from 'react'
import { cases, casesEn, casesTitle, casesTitleEn, casesShowMore, casesShowMoreEn } from '../../data/cases'
import { useLanguage } from '../../contexts/LanguageContext'

export function CasesSection() {
    const { language } = useLanguage()
    const isEnglish = language === 'en'
    
    const casesData = isEnglish ? casesEn : cases
    const title = isEnglish ? casesTitleEn : casesTitle
    const showMoreText = isEnglish ? casesShowMoreEn : casesShowMore
    
    return (
        <section id="cases" className="cases">
            <div className="container">
                <h2 className="cases__title">{title}</h2>

                <div className="cases__grid">
                    {casesData.map((caseItem) => {
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
                                        <h3 className="case-card__title">{caseItem.title}</h3>
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
                                        <h3 className="case-card__title">{caseItem.title}</h3>
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
                                    <h3 className="case-card__title case-card__title--dark">{caseItem.title}</h3>
                                    <p className="case-card__date case-card__date--dark">{caseItem.date}</p>
                                    {caseItem.description && (
                                        <p className="case-card__description case-card__description--dark">
                                            {caseItem.description}
                                        </p>
                                    )}
                                </div>
                            </article>
                        )
                    })}
                </div>

                <div className="cases__footer">
                    <button className="cases__show-more" type="button">
                        {showMoreText}
                    </button>
                </div>
            </div>
        </section>
    )
}
