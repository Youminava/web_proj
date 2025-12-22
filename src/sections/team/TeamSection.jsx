import React from 'react'
import { teamMembers } from '../../data/team'
import { useTranslation } from 'react-i18next'

export function TeamSection() {
    const { t } = useTranslation()
    return (
        <section id="team" className="team">
            <div className="container">
                <h2 className="team__title">{t('team.title')}</h2>

                <div className="team__grid">
                    {teamMembers.map((member) => (
                        <article key={member.id} className="team-member">
                            <div className="team-member__image-wrapper">
                                <img
                                    src={member.image}
                                    alt={t(member.nameKey)}
                                    className="team-member__image"
                                />
                            </div>
                            <div className="team-member__content">
                                <h3 className="team-member__name">{t(member.nameKey)}</h3>
                                <p className="team-member__role">{t(member.roleKey)}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
