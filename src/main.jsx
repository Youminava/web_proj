import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'

import './styles/variables.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/ui.css'
import './styles/sections/anchors.css'
import './styles/sections/hero.css'
import './styles/sections/support.css'
import './styles/sections/tariffs.css'
import './styles/sections/cases.css'
import './styles/sections/team.css'
import './styles/sections/reviews.css'
import './styles/sections/partners.css'
import './styles/sections/contact.css'
import './styles/sections/contact-modal.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
