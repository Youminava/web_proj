import React from 'react'
import { supportItems, supportSubtitle, supportTitle } from '../../data/support'
import { renderWithLineBreaks } from '../../utils/text'

export function SupportSection() {
    return (
        <div className="support">
            <h2 className="support__title">
                {renderWithLineBreaks(supportTitle)}
            </h2>

            <p className="support__subtitle">
                {supportSubtitle}
            </p>

            <div className="support__grid">
                {supportItems.map((item, idx) => (
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
