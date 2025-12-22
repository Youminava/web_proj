import React, { useMemo, useState } from 'react'
import reviewBgShape from '../../assets/img/review-quote-bg.svg'
import { reviews } from '../../data/reviews'

export function ReviewsSection() {
    const [current, setCurrent] = useState(0)
    const total = reviews.length

    const review = useMemo(() => reviews[current], [current])

    const next = () => setCurrent((prev) => (prev + 1) % total)
    const prev = () => setCurrent((prev) => (prev - 1 + total) % total)

    const formatNumber = (value) => String(value).padStart(2, '0')

    return (
        <section id="reviews" className="reviews">
            <div className="container">
                <h2 className="reviews__title">Отзывы</h2>

                <div className="reviews__wrap">
                    <div className="reviews__bg-shape" aria-hidden="true">
                        <img src={reviewBgShape} alt="" />
                    </div>

                    <div className="reviews__card-stack">
                        <div className="reviews__card reviews__card--ghost reviews__card--ghost-top" aria-hidden="true" />
                        <div className="reviews__card reviews__card--ghost" aria-hidden="true" />

                        <article className="reviews__card reviews__card--main">
                            <div className="reviews__content">
                                <img
                                    className="reviews__logo"
                                    src={review.logo}
                                    alt={review.alt}
                                />

                                <p className="reviews__headline">
                                    {review.headline}
                                </p>

                                <p className="reviews__author">
                                    {review.author}
                                </p>
                            </div>

                            <div className="reviews__divider" aria-hidden="true" />

                            <div className="reviews__controls">
                                <button
                                    type="button"
                                    className="reviews__arrow reviews__arrow--prev"
                                    aria-label="Предыдущий отзыв"
                                    onClick={prev}
                                >
                                    <svg
                                        width="16"
                    height="32"
                    viewBox="0 0 18 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.7072 0.353516L0.707153 16.3535L16.7072 32.3535"
                        stroke="#050C33"
                        strokeWidth="1"
                                        />
                                    </svg>
                                </button>

                                <div className="reviews__counter">
                                    <span className="reviews__counter-current">{formatNumber(current + 1)}</span>
                                    <span className="reviews__counter-total">/ {formatNumber(total)}</span>
                                </div>

                                <button
                                    type="button"
                                    className="reviews__arrow reviews__arrow--next"
                                    aria-label="Следующий отзыв"
                                    onClick={next}
                                >
                                    <svg
                                        width="16"
                    height="32"
                    viewBox="0 0 18 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.353516 0.353516L16.3535 16.3535L0.353516 32.3535"
                        stroke="#050C33"
                        strokeWidth="1"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
