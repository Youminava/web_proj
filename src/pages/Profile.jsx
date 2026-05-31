import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import {
    authTitle,
    authTitleEn,
    authLoginPlaceholder,
    authLoginPlaceholderEn,
    authPasswordPlaceholder,
    authPasswordPlaceholderEn,
    authSubmitButton,
    authSubmitButtonEn,
    authLoadingButton,
    authLoadingButtonEn,
    editTitle,
    editTitleEn,
    editSaveButton,
    editSaveButtonEn,
    editSavingButton,
    editSavingButtonEn,
    editSavedMessage,
    editSavedMessageEn,
    logoutButton,
    logoutButtonEn,
    formNamePlaceholder,
    formNamePlaceholderEn,
    formPhonePlaceholder,
    formPhonePlaceholderEn,
    formEmailPlaceholder,
    formCommentPlaceholder,
    formCommentPlaceholderEn,
    formLoginLabel,
    formLoginLabelEn,
    profilePageTitle,
    profilePageTitleEn,
    profileBackLink,
    profileBackLinkEn,
} from '../data/contact'
import {
    authenticate,
    saveEdits,
    setCredField,
    setEditField,
    logout,
} from '../sections/contact/authEditSlice'
import { useLanguage } from '../contexts/LanguageContext'

export function Profile() {
    const { id } = useParams()
    const { language } = useLanguage()
    const isEnglish = language === 'en'
    const dispatch = useDispatch()

    const credentials = useSelector((s) => s.authEdit.credentials)
    const authStatus = useSelector((s) => s.authEdit.authStatus)
    const authError = useSelector((s) => s.authEdit.authError)
    const user = useSelector((s) => s.authEdit.user)
    const values = useSelector((s) => s.authEdit.values)
    const errors = useSelector((s) => s.authEdit.errors)
    const saveStatus = useSelector((s) => s.authEdit.saveStatus)
    const saveError = useSelector((s) => s.authEdit.saveError)

    useEffect(() => {
        dispatch(logout())
    }, [dispatch, id])

    const onCred = useCallback(
        (field) => (e) => dispatch(setCredField({ field, value: e.target.value })),
        [dispatch],
    )
    const onEdit = useCallback(
        (field) => (e) => dispatch(setEditField({ field, value: e.target.value })),
        [dispatch],
    )
    const onLogin = useCallback(
        (e) => {
            e.preventDefault()
            dispatch(authenticate({ expectedId: id }))
        },
        [dispatch, id],
    )
    const onSave = useCallback(
        (e) => {
            e.preventDefault()
            dispatch(saveEdits())
        },
        [dispatch],
    )

    const isAuthorized = authStatus === 'authorized'
    const isLoading = authStatus === 'loading'
    const isSaving = saveStatus === 'saving'

    return (
        <section className="profile">
            <div className="container profile__inner">
                <Link to="/" className="profile__back">
                    {isEnglish ? profileBackLinkEn : profileBackLink}
                </Link>
                <h1 className="profile__title">
                    {isEnglish ? profilePageTitleEn : profilePageTitle}
                </h1>

                {!isAuthorized && (
                    <form className="contact__form" onSubmit={onLogin} noValidate>
                        <p className="contact__auth-title">
                            {isEnglish ? authTitleEn : authTitle}
                        </p>

                        <label className="contact__field">
                            <input
                                type="text"
                                name="login"
                                placeholder={isEnglish ? authLoginPlaceholderEn : authLoginPlaceholder}
                                value={credentials.login}
                                onChange={onCred('login')}
                            />
                        </label>

                        <label className="contact__field">
                            <input
                                type="password"
                                name="password"
                                placeholder={isEnglish ? authPasswordPlaceholderEn : authPasswordPlaceholder}
                                value={credentials.password}
                                onChange={onCred('password')}
                            />
                        </label>

                        <button type="submit" className="contact__submit" disabled={isLoading}>
                            {isLoading
                                ? isEnglish ? authLoadingButtonEn : authLoadingButton
                                : isEnglish ? authSubmitButtonEn : authSubmitButton}
                        </button>

                        {authStatus === 'error' && <p className="contact__error">{authError}</p>}
                    </form>
                )}

                {isAuthorized && (
                    <form className="contact__form" onSubmit={onSave} noValidate>
                        <p className="contact__auth-title">
                            {isEnglish ? editTitleEn : editTitle}
                        </p>
                        <p className="contact__credential">
                            {isEnglish ? formLoginLabelEn : formLoginLabel}: <b>{user?.login}</b>
                        </p>

                        <label className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                            <input
                                type="text"
                                name="name"
                                placeholder={isEnglish ? formNamePlaceholderEn : formNamePlaceholder}
                                value={values.name}
                                onChange={onEdit('name')}
                            />
                        </label>
                        {errors.name && <p className="contact__error">{errors.name}</p>}

                        <label className={`contact__field ${errors.phone ? 'contact__field--error' : ''}`}>
                            <input
                                type="tel"
                                name="phone"
                                placeholder={isEnglish ? formPhonePlaceholderEn : formPhonePlaceholder}
                                value={values.phone}
                                onChange={onEdit('phone')}
                            />
                        </label>
                        {errors.phone && <p className="contact__error">{errors.phone}</p>}

                        <label className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                            <input
                                type="email"
                                name="email"
                                placeholder={formEmailPlaceholder}
                                value={values.email}
                                onChange={onEdit('email')}
                            />
                        </label>
                        {errors.email && <p className="contact__error">{errors.email}</p>}

                        <label className="contact__field contact__field--textarea">
                            <textarea
                                name="comment"
                                rows="3"
                                placeholder={isEnglish ? formCommentPlaceholderEn : formCommentPlaceholder}
                                value={values.comment}
                                onChange={onEdit('comment')}
                            />
                        </label>

                        <button type="submit" className="contact__submit" disabled={isSaving}>
                            {isSaving
                                ? isEnglish ? editSavingButtonEn : editSavingButton
                                : isEnglish ? editSaveButtonEn : editSaveButton}
                        </button>

                        <button
                            type="button"
                            className="contact__logout"
                            onClick={() => dispatch(logout())}
                        >
                            {isEnglish ? logoutButtonEn : logoutButton}
                        </button>

                        {saveStatus === 'saved' && (
                            <p className="contact__success">
                                {isEnglish ? editSavedMessageEn : editSavedMessage}
                            </p>
                        )}
                        {saveStatus === 'error' && <p className="contact__error">{saveError}</p>}
                    </form>
                )}
            </div>
        </section>
    )
}
