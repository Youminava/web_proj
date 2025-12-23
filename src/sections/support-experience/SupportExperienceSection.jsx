import React from 'react'

import druplicon from '/src/assets/img/druplicon.svg'
import {
    analyticsImageRu,
    analyticsImageEn,
    expertisePoints,
    expertisePointsEn,
    expertiseTitle,
    expertiseTitleEn,
    supportExperienceCards,
    supportExperienceItemsEn,
    supportExperienceTitle,
    supportExperienceTitleEn,
} from '../../data/supportExperience'
import { renderWithLineBreaks } from '../../utils/text'
import { useLanguage } from '../../contexts/LanguageContext'

export function SupportExperienceSection() {
    const { language } = useLanguage()
    
    const isEnglish = language === 'en'
    
    const cards = isEnglish ? supportExperienceItemsEn : supportExperienceCards
    const title = isEnglish ? supportExperienceTitleEn : supportExperienceTitle
    const expertiseTitleText = isEnglish ? expertiseTitleEn : expertiseTitle
    const expertisePointsText = isEnglish ? expertisePointsEn : expertisePoints
    const analyticsImage = isEnglish ? analyticsImageEn : analyticsImageRu
    
    return (
        <section className="section support-exp" id="support-exp">
            <div className="container">
                <img src={druplicon} alt="" className="support-exp__bg-icon" aria-hidden="true" />

                
                <div className="support-exp__top">
                    <h2 className="support-exp__title">
                        {renderWithLineBreaks(title)}
                    </h2>

                    <div className="support-exp__grid">
                        {cards.map((card, i) => (
                            <article key={i} className="support-exp__card">
                                <img src={card.bg} alt="" className="support-exp__card-bg" />
                                <div className="support-exp__num">{card.num}</div>
                                <h3 className="support-exp__card-title">{renderWithLineBreaks(card.title)}</h3>
                                <p className="support-exp__card-text">{renderWithLineBreaks(card.text)}</p>
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
                            {renderWithLineBreaks(expertiseTitleText)}
                        </h2>

                        <div className="support-exp__info-grid">
                            {expertisePointsText.map((point, index) => (
                                <div className="support-exp__info-item" key={index}>
                                    <div className="support-exp__info-line" />
                                    <p className="support-exp__info-text">
                                        {renderWithLineBreaks(point)}
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
