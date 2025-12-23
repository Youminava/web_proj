import React from 'react'
import { supportItems, supportSubtitle, supportTitle, supportItemsEn, supportSubtitleEn, supportTitleEn } from '../../data/support'
import { renderWithLineBreaks } from '../../utils/text'
import { useLanguage } from '../../contexts/LanguageContext'

export function SupportSection() {
    const { language } = useLanguage()
    const currentItems = language === 'ru' ? supportItems : supportItemsEn
    const currentTitle = language === 'ru' ? supportTitle : supportTitleEn
    const currentSubtitle = language === 'ru' ? supportSubtitle : supportSubtitleEn

    return (
        <div className="support">
            <h2 className="support__title">
                {renderWithLineBreaks(currentTitle)}
            </h2>

            <p className="support__subtitle">
                {currentSubtitle}
            </p>

            <div className="support__grid">
                {currentItems.map((item, idx) => (
                    <div key={idx} className="support__item">
                        <img src={item.icon} alt="" className="support__icon" />
                        <img src={item.bg} className="support__icon-bg" alt="" />
                        <p className="support__text">{renderWithLineBreaks(item.text)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
