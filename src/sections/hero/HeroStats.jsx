import React from 'react'
import { heroStats } from '../../data/hero'
import cupImg from '/src/assets/img/cup.png'
import { useTranslation } from 'react-i18next'

export function HeroStats() {
    const { t } = useTranslation()
    return (
        <div className="hero-stats">
            {heroStats.map((item, index) => {
                const isFirst = index === 0
                return (
                    <div
                        key={index}
                        className={`hero-stats__item${isFirst ? ' hero-stats__item--with-cup' : ''}`}
                    >
                        <span className="hero-stats__line" aria-hidden="true" />
                        <div className="hero-stats__content">
                            <div className="hero-stats__num">{item.num}</div>
                            <div className="hero-stats__text">{t(item.textKey)}</div>
                        </div>
                        {isFirst && (
                            <img
                                src={cupImg}
                                alt=""
                                className="hero-stats__cup"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
