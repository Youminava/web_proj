import React from 'react'
import { teamMembers } from '../../data/team'

export function TeamSection() {
    return (
        <section id="team" className="team">
            <div className="container">
                <h2 className="team__title">Наша команда</h2>

                <div className="team__grid">
                    {teamMembers.map((member) => (
                        <article key={member.id} className="team-member">
                            <div className="team-member__image-wrapper">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="team-member__image"
                                />
                            </div>
                            <div className="team-member__content">
                                <h3 className="team-member__name">{member.name}</h3>
                                <p className="team-member__role">{member.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
