import React from 'react'
import contactBgTop from '../../assets/img/D-flying.svg'
import contactBgBottom from '../../assets/img/D-flying-bottom.svg'
import contactIconPhone from '../../assets/img/contact-icon-phone.svg'
import contactIconMail from '../../assets/img/contact-icon-mail.svg'
import {
    contactEmail,
    contactEmailHref,
    contactPhone,
    contactPhoneHref,
} from '../../data/contact'
import { ContactForm } from './ContactForm'
import { useTranslation } from 'react-i18next'
import { renderWithLineBreaks } from '../../utils/text'

export function ContactSection() {
    const { t } = useTranslation()
    return (
        <section id="contacts" className="contact">
            <div className="contact__bg contact__bg--top">
                <img src={contactBgTop} alt="" />
            </div>
            <div className="contact__bg contact__bg--bottom">
                <img src={contactBgBottom} alt="" />
            </div>

            <div className="container contact__inner">
                <div className="contact__info">
                    <h2 className="contact__title">{t('contact.title')}</h2>
                    <p className="contact__text">{renderWithLineBreaks(t('contact.text'))}</p>

                    <div className="contact__links">
                        <a className="contact__link contact__link--phone" href={contactPhoneHref}>
                            <img src={contactIconPhone} alt="" className="contact__icon" />
                            <span>{contactPhone}</span>
                        </a>

                        <a className="contact__link" href={contactEmailHref}>
                            <img src={contactIconMail} alt="" className="contact__icon" />
                            <span className="contact__mail">{contactEmail}</span>
                        </a>
                    </div>
                </div>

                <ContactForm submitLabelKey="contact.form.submit" />
            </div>

            <div className="contact__footnote container">
                <p>{t('contact.footnote.line1')}</p>
                <p>{t('contact.footnote.line2')}</p>
            </div>
        </section>
    )
}
