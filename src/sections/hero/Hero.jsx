import React from 'react'
import heroVideo from '/src/assets/video/video.mp4'
import druplicon from '/src/assets/img/druplicon.svg'
import { HeroStats } from './HeroStats'
import { heroActions, heroCopy } from '../../data/hero'
import { renderWithLineBreaks } from '../../utils/text'
export function Hero() {
    return (

        <section className="hero" id="hero">
            <div className="hero__bg">
                <video
                    className="hero__video"
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                <img src={druplicon} className="hero__image" />
                <div className="hero__overlay" />
            </div>

                <div className="container hero__content">
                <div className="hero__text" id="hero-text">
                    <h1 className="hero__title" id="hero-title">
                        {renderWithLineBreaks(heroCopy.title)}
                    </h1>
                    <p className="hero__subtitle" id="hero-subtitle">
                        {renderWithLineBreaks(heroCopy.subtitle)}
                    </p>

                    <div className="hero__actions" id="hero-actions">
                        {heroActions.map((action) => (
                            <a
                                key={action.id}
                                href={action.href || '#'}
                                className={`btn ${action.variant === 'outline' ? 'btn--outline ' : ''}hero__btn-outline`}
                                id={action.id}
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </div>
                <div id="hero-stats">
                    <HeroStats />
                </div>
            </div>
        </section>
    )
}
