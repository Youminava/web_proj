import React, { useEffect, useRef } from 'react'
import { partners } from '../../data/partners'
import { renderWithLineBreaks } from '../../utils/text'

export function PartnersSection() {
    // удваиваем список, чтобы анимация была бесшовной
    const marqueePartners = [...partners, ...partners]
    const row1Ref = useRef(null)
    const row2Ref = useRef(null)

    useEffect(() => {
        let rafId
        let offset1 = 0
        let offset2 = 0

        const getCycle = () => {
            const el = row1Ref.current
            if (!el) return 1
            // одна половина — потому что список удвоен
            return Math.max(el.scrollWidth / 2, 1)
        }

        const getHalfCard = () => {
            const card = row1Ref.current?.querySelector('.partners__card')
            const gap = 20
            return card ? (card.getBoundingClientRect().width + gap) / 2 : gap
        }

        const step = () => {
            const cycle = getCycle()
            const shift = 0.4 // скорость в пикселях за кадр

            offset1 -= shift
            offset2 -= shift

            if (Math.abs(offset1) >= cycle) offset1 += cycle
            if (Math.abs(offset2) >= cycle) offset2 += cycle

            if (row1Ref.current) {
                row1Ref.current.style.transform = `translate3d(${offset1}px, 0, 0)`
            }
            if (row2Ref.current) {
                row2Ref.current.style.transform = `translate3d(${offset2}px, 0, 0)`
            }

            rafId = requestAnimationFrame(step)
        }

        // начальный сдвиг нижней строки на полкарточки
        offset2 = -getHalfCard()
        rafId = requestAnimationFrame(step)

        return () => cancelAnimationFrame(rafId)
    }, [])

    return (
        <section id="partners" className="partners">
            <div className="container">
                <h2 className="partners__title">Партнеры</h2>
                <p className="partners__subtitle">
                    {renderWithLineBreaks('Компании, с которыми мы работаем')}
                </p>

                <div className="partners__viewport">
                    <div className="partners__rows">
                        <div className="partners__row" ref={row1Ref}>
                            {marqueePartners.map((logo, index) => (
                                <div
                                    className="partners__card"
                                    key={`row1-${logo.alt}-${index}`}
                                >
                                    <img
                                        className="partners__logo"
                                        src={logo.src}
                                        alt={logo.alt}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="partners__row partners__row--bottom" ref={row2Ref}>
                            {marqueePartners.map((logo, index) => (
                                <div
                                    className="partners__card"
                                    key={`row2-${logo.alt}-${index}`}
                                >
                                    <img
                                        className="partners__logo"
                                        src={logo.src}
                                        alt={logo.alt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
