import React from 'react'
import { Header } from '../components/layout/Header'
import { Hero } from '../sections/hero/Hero'
import { SupportSection } from '../sections/support/SupportSection'
import { SupportExperienceSection } from '../sections/support-experience/SupportExperienceSection'
import { TariffsSection } from '../sections/tariffs/TariffsSection'
import { CasesSection } from '../sections/cases/CasesSection'
import { TeamSection } from '../sections/team/TeamSection'
import { ReviewsSection } from '../sections/reviews/ReviewsSection'
import { PartnersSection } from '../sections/partners/PartnersSection'
import { ContactSection } from '../sections/contact/ContactSection'
export function Home({ onBurgerClick, onContactClick }) {
    return (
        <>
            <Header
                onBurgerClick={onBurgerClick}
                onContactClick={onContactClick}
            />

            <main>
                
                <Hero />

                
                <section id="support" className="section section--white">
                    <div className="container">
                        <SupportSection />
                    </div>
                </section>
                <SupportExperienceSection />
                <TariffsSection />
                <CasesSection />
                <TeamSection />
                <ReviewsSection />
                <PartnersSection />
                <ContactSection />
            </main>
        </>
    )
}
