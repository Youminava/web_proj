import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import checkIcon from '../../assets/img/check.svg'
import { consentText } from '../../data/contact'
import {
    clearSubmitState,
    setConsent,
    setField,
    submitContactForm,
} from './contactFormSlice'

export function ContactForm() {
    const dispatch = useDispatch()

    const values = useSelector((s) => s.contactForm.values)
    const errors = useSelector((s) => s.contactForm.errors)
    const status = useSelector((s) => s.contactForm.status)
    const submitErrorMessageKey = useSelector((s) => s.contactForm.submitErrorMessageKey)

    const isLoading = status === 'loading'

    const onChangeField = useCallback(
        (field) => (e) => {
            dispatch(clearSubmitState())
            dispatch(setField({ field, value: e.target.value }))
        },
        [dispatch],
    )

    const onChangeConsent = useCallback(
        (e) => {
            dispatch(clearSubmitState())
            dispatch(setConsent(e.target.checked))
        },
        [dispatch],
    )

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            dispatch(submitContactForm())
        },
        [dispatch],
    )

    return (
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <label className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={values.name}
                    onChange={onChangeField('name')}
                />
            </label>
            {errors.name && <p className="contact__error">{errors.name}</p>}

            <label className={`contact__field ${errors.phone ? 'contact__field--error' : ''}`}>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон"
                    value={values.phone}
                    onChange={onChangeField('phone')}
                />
            </label>
            {errors.phone && <p className="contact__error">{errors.phone}</p>}

            <label className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={onChangeField('email')}
                />
            </label>
            {errors.email && <p className="contact__error">{errors.email}</p>}

            <label className="contact__field contact__field--textarea">
                <textarea
                    name="comment"
                    rows="3"
                    placeholder="Комментарий"
                    value={values.comment}
                    onChange={onChangeField('comment')}
                />
            </label>

            <label className={`contact__checkbox ${errors.consent ? 'contact__checkbox--error' : ''}`}>
                <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={onChangeConsent}
                />
                <span className="contact__checkbox-box">
                    <img src={checkIcon} alt="" />
                </span>
                <span className="contact__checkbox-label">{consentText}</span>
            </label>
            {errors.consent && <p className="contact__error">{errors.consent}</p>}

            <button type="submit" className="contact__submit" disabled={isLoading}>
                {isLoading ? 'Отправка...' : 'Отправить'}
            </button>

            {status === 'success' && <p className="contact__success">Форма отправлена успешно!</p>}
            {status === 'error' && (
                <p className="contact__error">{submitErrorMessageKey || 'Ошибка отправки'}</p>
            )}
        </form>
    )
}
