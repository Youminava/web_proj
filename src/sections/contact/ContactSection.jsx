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
    contactTitle,
    contactTitleEn,
    contactText,
    contactTextEn,
    contactFootnote1,
    contactFootnote1En,
    contactFootnote2,
    contactFootnote2En,
} from '../../data/contact'
import { ContactForm } from './ContactForm'
import { renderWithLineBreaks } from '../../utils/text'
import { useLanguage } from '../../contexts/LanguageContext'

export function ContactSection() {
    const { language } = useLanguage()
    const isEnglish = language === 'en'
    
    const title = isEnglish ? contactTitleEn : contactTitle
    const text = isEnglish ? contactTextEn : contactText
    const footnote1 = isEnglish ? contactFootnote1En : contactFootnote1
    const footnote2 = isEnglish ? contactFootnote2En : contactFootnote2
    
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
                    <h2 className="contact__title">{title}</h2>
                    <p className="contact__text">{renderWithLineBreaks(text)}</p>

                    <div className="contact__links">
                        <div className="contact__link contact__link--phone">
                            <span>8 800 222-26-73</span>
                        </div>

                        <div className="contact__link">
                            <span className="contact__mail">info@drupal-coder.ru</span>
                        </div>
                    </div>
                </div>

                <ContactForm />
            </div>

            <div className="contact__footnote container">
                <p>{footnote1}</p>
                <p>{footnote2}</p>
            </div>
        </section>
    )
}
