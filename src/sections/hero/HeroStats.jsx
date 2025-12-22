import React from 'react'
import { heroStats } from '../../data/hero'
import cupImg from '/src/assets/img/cup.png'

export function HeroStats() {
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
                            <div className="hero-stats__text">{item.text}</div>
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
