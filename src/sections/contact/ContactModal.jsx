import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContactForm } from './ContactForm'
import { rafAnimate } from './rafAnimate'

const DURATION_MS = 280

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3)
}

export function ContactModal() {
    const navigate = useNavigate()
    const location = useLocation()

    const origin = useSelector((s) => s.ui.contactModalOrigin)

    const originPoint = useMemo(() => {
        const fallback = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        if (!origin || typeof origin.x !== 'number' || typeof origin.y !== 'number') return fallback
        return origin
    }, [origin])

    const [progress, setProgress] = useState(0)
    const progressRef = useRef(0)
    const cancelRef = useRef(null)

    const stopRaf = useCallback(() => {
        if (cancelRef.current) cancelRef.current()
        cancelRef.current = null
    }, [])

    const animateTo = useCallback(
        (target) =>
            new Promise((resolve) => {
                stopRaf()
                const from = progressRef.current
                cancelRef.current = rafAnimate({
                    from,
                    to: target,
                    durationMs: DURATION_MS,
                    easing: easeOutCubic,
                    onUpdate: (next) => {
                        progressRef.current = next
                        setProgress(next)
                    },
                    onComplete: resolve,
                })
            }),
        [stopRaf],
    )

    const close = useCallback(async () => {
        await animateTo(0)

        const hasBackground = Boolean(location.state?.backgroundLocation)
        if (hasBackground) {
            navigate(-1)
        } else {
            navigate('/')
        }
    }, [animateTo, navigate, location.state])

    useEffect(() => {
        animateTo(1)
        document.documentElement.classList.add('modal-open')
        try {
            window.history.replaceState(
                { ...window.history.state, contactModal: true },
                document.title,
                window.location.href,
            )
        } catch {
            // ignore History API errors
        }
        return () => {
            stopRaf()
            document.documentElement.classList.remove('modal-open')
        }
    }, [animateTo, stopRaf])

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [close])

    const center = useMemo(
        () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }),
        [],
    )
    const dx = originPoint.x - center.x
    const dy = originPoint.y - center.y

    const scale = 0.2 + 0.8 * progress
    const translateX = dx * (1 - progress)
    const translateY = dy * (1 - progress)

    const dialogStyle = {
        transform: `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`,
        opacity: progress,
    }

    const backdropStyle = { opacity: Math.min(1, progress) }

    return (
        <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Контактная форма">
            <div
                className="contact-modal__backdrop"
                style={backdropStyle}
                onClick={close}
            />

            <div className="contact-modal__dialog" style={dialogStyle}>
                <button
                    type="button"
                    className="contact-modal__close"
                    onClick={close}
                    aria-label="Закрыть"
                >
                    ✕
                </button>

                <h2 className="contact-modal__title">Связаться с нами</h2>
                <p className="contact-modal__subtitle">
                    Оставьте заявку, и мы свяжемся с вами
                </p>

                <ContactForm />
            </div>
        </div>
    )
}
