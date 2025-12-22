export function rafAnimate({
    from,
    to,
    durationMs,
    onUpdate,
    onComplete,
    easing = (t) => t,
}) {
    let rafId = 0
    const start = performance.now()
    const delta = to - from

    const step = (now) => {
        const t = Math.min(1, (now - start) / durationMs)
        const eased = easing(t)
        onUpdate(from + delta * eased)

        if (t < 1) {
            rafId = requestAnimationFrame(step)
        } else if (onComplete) {
            onComplete()
        }
    }

    rafId = requestAnimationFrame(step)

    return () => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = 0
    }
}
