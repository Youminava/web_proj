import React from 'react'

import druplicon from '/src/assets/img/druplicon.svg'
import {
    analyticsImageEn,
    analyticsImageRu,
    expertisePoints,
    expertiseTitleKey,
    supportExperienceCards,
    supportExperienceTitleKey,
} from '../../data/supportExperience'
import { renderWithLineBreaks } from '../../utils/text'
import { useTranslation } from 'react-i18next'

export function SupportExperienceSection() {
    const { t, i18n } = useTranslation()
    const analyticsImage = i18n.language === 'en' ? analyticsImageEn : analyticsImageRu
    return (
        <section className="section support-exp" id="support-exp">
            <div className="container">
                <img src={druplicon} alt="" className="support-exp__bg-icon" aria-hidden="true" />

                
                <div className="support-exp__top">
                    <h2 className="support-exp__title">
                        {renderWithLineBreaks(t(supportExperienceTitleKey))}
                    </h2>

                    <div className="support-exp__grid">
                        {supportExperienceCards.map((card, i) => (
                            <article key={i} className="support-exp__card">
                                <img src={card.bg} alt="" className="support-exp__card-bg" />
                                <div className="support-exp__num">{card.num}</div>
                                <h3 className="support-exp__card-title">{renderWithLineBreaks(t(card.titleKey))}</h3>
                                <p className="support-exp__card-text">{renderWithLineBreaks(t(card.textKey))}</p>
                            </article>
                        ))}
                    </div>
                </div>

                
                <div className="support-exp__bottom">
                    <div className="support-exp__image-wrap">
                        <img src={analyticsImage} alt="" className="support-exp__image" />
                    </div>

                    <div className="support-exp__info">
                        <h2 className="support-exp__info-title">
                            {renderWithLineBreaks(t(expertiseTitleKey))}
                        </h2>

                        <div className="support-exp__info-grid">
                            {expertisePoints.map((point, index) => (
                                <div className="support-exp__info-item" key={index}>
                                    <div className="support-exp__info-line" />
                                    <p className="support-exp__info-text">
                                        {renderWithLineBreaks(t(point))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
