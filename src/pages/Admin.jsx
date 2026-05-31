import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    adminPageTitle,
    adminPageTitleEn,
    adminLoginTitle,
    adminLoginTitleEn,
    adminLoginButton,
    adminLoginButtonEn,
    adminLoadingButton,
    adminLoadingButtonEn,
    adminBackLink,
    adminBackLinkEn,
    adminLogoutButton,
    adminLogoutButtonEn,
    adminCountLabel,
    adminCountLabelEn,
    adminEmpty,
    adminEmptyEn,
    adminColName,
    adminColNameEn,
    adminColPhone,
    adminColPhoneEn,
    adminColEmail,
    adminColEmailEn,
    adminColComment,
    adminColCommentEn,
    adminColLogin,
    adminColLoginEn,
    adminColCreated,
    adminColCreatedEn,
    adminColActions,
    adminColActionsEn,
    adminEditButton,
    adminEditButtonEn,
    adminDeleteButton,
    adminDeleteButtonEn,
    adminSaveButton,
    adminSaveButtonEn,
    adminSavingButton,
    adminSavingButtonEn,
    adminCancelButton,
    adminCancelButtonEn,
    adminDeletingButton,
    adminDeletingButtonEn,
    adminDeleteConfirm,
    adminDeleteConfirmEn,
    authLoginPlaceholder,
    authLoginPlaceholderEn,
    authPasswordPlaceholder,
    authPasswordPlaceholderEn,
    formNamePlaceholder,
    formNamePlaceholderEn,
    formPhonePlaceholder,
    formPhonePlaceholderEn,
    formEmailPlaceholder,
    formCommentPlaceholder,
    formCommentPlaceholderEn,
} from '../data/contact'
import {
    loginAdmin,
    deleteUser,
    saveUser,
    setCredField,
    startEdit,
    setEditField,
    cancelEdit,
    logout,
} from '../sections/admin/adminSlice'
import { useLanguage } from '../contexts/LanguageContext'

export function Admin() {
    const { language } = useLanguage()
    const isEn = language === 'en'
    const dispatch = useDispatch()

    const credentials = useSelector((s) => s.admin.credentials)
    const authStatus = useSelector((s) => s.admin.authStatus)
    const authError = useSelector((s) => s.admin.authError)
    const users = useSelector((s) => s.admin.users)
    const actionError = useSelector((s) => s.admin.actionError)
    const editingId = useSelector((s) => s.admin.editingId)
    const editValues = useSelector((s) => s.admin.editValues)
    const editErrors = useSelector((s) => s.admin.editErrors)
    const savingId = useSelector((s) => s.admin.savingId)
    const deletingId = useSelector((s) => s.admin.deletingId)

    const isAuthorized = authStatus === 'authorized'
    const isLoading = authStatus === 'loading'

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
            dispatch(loginAdmin())
        },
        [dispatch],
    )
    const onDelete = useCallback(
        (id) => {
            if (window.confirm(isEn ? adminDeleteConfirmEn : adminDeleteConfirm)) {
                dispatch(deleteUser(id))
            }
        },
        [dispatch, isEn],
    )

    return (
        <section className="admin">
            <div className="container admin__inner">
                <div className="admin__topbar">
                    <Link to="/" className="admin__back">
                        {isEn ? adminBackLinkEn : adminBackLink}
                    </Link>
                    {isAuthorized && (
                        <button
                            type="button"
                            className="admin__logout"
                            onClick={() => dispatch(logout())}
                        >
                            {isEn ? adminLogoutButtonEn : adminLogoutButton}
                        </button>
                    )}
                </div>

                <h1 className="admin__title">{isEn ? adminPageTitleEn : adminPageTitle}</h1>

                {!isAuthorized && (
                    <form className="contact__form admin__login" onSubmit={onLogin} noValidate>
                        <p className="contact__auth-title">
                            {isEn ? adminLoginTitleEn : adminLoginTitle}
                        </p>

                        <label className="contact__field">
                            <input
                                type="text"
                                name="login"
                                placeholder={isEn ? authLoginPlaceholderEn : authLoginPlaceholder}
                                value={credentials.login}
                                onChange={onCred('login')}
                            />
                        </label>

                        <label className="contact__field">
                            <input
                                type="password"
                                name="password"
                                placeholder={isEn ? authPasswordPlaceholderEn : authPasswordPlaceholder}
                                value={credentials.password}
                                onChange={onCred('password')}
                            />
                        </label>

                        <button type="submit" className="contact__submit" disabled={isLoading}>
                            {isLoading
                                ? isEn ? adminLoadingButtonEn : adminLoadingButton
                                : isEn ? adminLoginButtonEn : adminLoginButton}
                        </button>

                        {authStatus === 'error' && <p className="contact__error">{authError}</p>}
                    </form>
                )}

                {isAuthorized && (
                    <>
                        <p className="admin__count">
                            {isEn ? adminCountLabelEn : adminCountLabel}: <b>{users.length}</b>
                        </p>
                        {actionError && <p className="contact__error">{actionError}</p>}

                        {users.length === 0 ? (
                            <p className="admin__empty">{isEn ? adminEmptyEn : adminEmpty}</p>
                        ) : (
                            <div className="admin__table-wrap">
                                <table className="admin__table">
                                    <thead>
                                        <tr>
                                            <th>{isEn ? adminColNameEn : adminColName}</th>
                                            <th>{isEn ? adminColPhoneEn : adminColPhone}</th>
                                            <th>{isEn ? adminColEmailEn : adminColEmail}</th>
                                            <th>{isEn ? adminColCommentEn : adminColComment}</th>
                                            <th>{isEn ? adminColLoginEn : adminColLogin}</th>
                                            <th>{isEn ? adminColCreatedEn : adminColCreated}</th>
                                            <th>{isEn ? adminColActionsEn : adminColActions}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => {
                                            const isEditing = editingId === u.id
                                            const isSaving = savingId === u.id
                                            const isDeleting = deletingId === u.id
                                            return (
                                                <tr key={u.id} className={isEditing ? 'is-editing' : ''}>
                                                    {isEditing ? (
                                                        <>
                                                            <td data-label={isEn ? adminColNameEn : adminColName}>
                                                                <input
                                                                    className={editErrors.name ? 'has-error' : ''}
                                                                    value={editValues.name}
                                                                    placeholder={isEn ? formNamePlaceholderEn : formNamePlaceholder}
                                                                    onChange={onEdit('name')}
                                                                />
                                                            </td>
                                                            <td data-label={isEn ? adminColPhoneEn : adminColPhone}>
                                                                <input
                                                                    className={editErrors.phone ? 'has-error' : ''}
                                                                    value={editValues.phone}
                                                                    placeholder={isEn ? formPhonePlaceholderEn : formPhonePlaceholder}
                                                                    onChange={onEdit('phone')}
                                                                />
                                                            </td>
                                                            <td data-label={isEn ? adminColEmailEn : adminColEmail}>
                                                                <input
                                                                    className={editErrors.email ? 'has-error' : ''}
                                                                    value={editValues.email}
                                                                    placeholder={formEmailPlaceholder}
                                                                    onChange={onEdit('email')}
                                                                />
                                                            </td>
                                                            <td data-label={isEn ? adminColCommentEn : adminColComment}>
                                                                <input
                                                                    value={editValues.comment}
                                                                    placeholder={isEn ? formCommentPlaceholderEn : formCommentPlaceholder}
                                                                    onChange={onEdit('comment')}
                                                                />
                                                            </td>
                                                            <td data-label={isEn ? adminColLoginEn : adminColLogin}>{u.login}</td>
                                                            <td data-label={isEn ? adminColCreatedEn : adminColCreated}>{u.created_at}</td>
                                                            <td className="admin__actions">
                                                                <button
                                                                    type="button"
                                                                    className="admin__btn admin__btn--save"
                                                                    disabled={isSaving}
                                                                    onClick={() => dispatch(saveUser({ id: u.id }))}
                                                                >
                                                                    {isSaving
                                                                        ? isEn ? adminSavingButtonEn : adminSavingButton
                                                                        : isEn ? adminSaveButtonEn : adminSaveButton}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="admin__btn"
                                                                    onClick={() => dispatch(cancelEdit())}
                                                                >
                                                                    {isEn ? adminCancelButtonEn : adminCancelButton}
                                                                </button>
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td data-label={isEn ? adminColNameEn : adminColName}>{u.name}</td>
                                                            <td data-label={isEn ? adminColPhoneEn : adminColPhone}>{u.phone}</td>
                                                            <td data-label={isEn ? adminColEmailEn : adminColEmail}>{u.email}</td>
                                                            <td data-label={isEn ? adminColCommentEn : adminColComment}>{u.comment}</td>
                                                            <td data-label={isEn ? adminColLoginEn : adminColLogin}>{u.login}</td>
                                                            <td data-label={isEn ? adminColCreatedEn : adminColCreated}>{u.created_at}</td>
                                                            <td className="admin__actions">
                                                                <button
                                                                    type="button"
                                                                    className="admin__btn"
                                                                    onClick={() => dispatch(startEdit(u))}
                                                                >
                                                                    {isEn ? adminEditButtonEn : adminEditButton}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="admin__btn admin__btn--danger"
                                                                    disabled={isDeleting}
                                                                    onClick={() => onDelete(u.id)}
                                                                >
                                                                    {isDeleting
                                                                        ? isEn ? adminDeletingButtonEn : adminDeletingButton
                                                                        : isEn ? adminDeleteButtonEn : adminDeleteButton}
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}
