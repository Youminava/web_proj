import React from 'react'
import logo from '../../assets/img/drupal-coder.svg'
import { mainNavItems } from '../../data/navigation'

export function Header({
                           activeSection = 'support',
                           onNavClick,
                           onBurgerClick,
                       }) {

    const handleNavClick = (e, item) => {
        if (onNavClick) {
            e.preventDefault()
            onNavClick(item)
        }
    }

    const handleLogoClick = (e) => {
        e.preventDefault()
        window.location.reload()
    }

    return (
        <header className="header">
            <div className="container header__inner">

                
                <div className="header__left">
                    <a
                        href={import.meta.env.BASE_URL || '/'}
                        className="header__logo"
                        onClick={handleLogoClick}
                    >
                        <img src={logo} alt="Drupal-coder" />
                    </a>
                </div>

                
                <nav className="header__nav header__nav--desktop">
                    {mainNavItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={
                                'header__link' +
                                (item.id === activeSection ? ' header__link--active' : '')
                            }
                            onClick={(e) => handleNavClick(e, item)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                
                <div className="header__right">
                    <button
                        type="button"
                        className="header__burger"
                        aria-label="Открыть меню"
                        onClick={onBurgerClick}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </header>
    )
}
