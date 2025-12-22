import React from 'react'
import { supportItems, supportSubtitleKey, supportTitleKey } from '../../data/support'
import { renderWithLineBreaks } from '../../utils/text'
import { useTranslation } from 'react-i18next'

export function SupportSection() {
    const { t } = useTranslation()
    return (
        <div className="support">
            <h2 className="support__title">
                {renderWithLineBreaks(t(supportTitleKey))}
            </h2>

            <p className="support__subtitle">
                {t(supportSubtitleKey)}
            </p>

            <div className="support__grid">
                {supportItems.map((item, idx) => (
                    <div key={idx} className="support__item">
                        <img src={item.icon} alt="" className="support__icon" />
                        <img src={item.bg} className="support__icon-bg" alt="" />
                        <p className="support__text">{renderWithLineBreaks(t(item.textKey))}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
