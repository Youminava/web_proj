import caseImg1 from '../assets/img/case-1.jpg'
import caseImg2 from '../assets/img/case-4.jpg'
import caseImg3 from '../assets/img/case-3.jpg'
import caseImg4 from '../assets/img/case-5.jpg'
import caseImg5 from '../assets/img/case-2.jpg'
import caseImg6 from '../assets/img/case-6.jpg'

const CASE_DATE = '22.04.2019'
const CASE_TITLE_KEY = 'cases.caseTitle'
const CASE_DESCRIPTION_KEY = 'cases.caseDescription'

export const cases = [
    {
        id: 1,
        variant: 'description',
        titleKey: CASE_TITLE_KEY,
        date: CASE_DATE,
        descriptionKey: CASE_DESCRIPTION_KEY,
        image: caseImg1,
    },
    {
        id: 2,
        variant: 'wide',
        titleKey: CASE_TITLE_KEY,
        image: caseImg5,
    },
    {
        id: 3,
        variant: 'vertical',
        titleKey: CASE_TITLE_KEY,
        date: CASE_DATE,
        image: caseImg3,
    },
    {
        id: 4,
        variant: 'vertical',
        titleKey: CASE_TITLE_KEY,
        date: CASE_DATE,
        image: caseImg2,
    },
    {
        id: 5,
        variant: 'description',
        titleKey: CASE_TITLE_KEY,
        date: CASE_DATE,
        descriptionKey: CASE_DESCRIPTION_KEY,
        image: caseImg4,
    },
    {
        id: 6,
        variant: 'wide',
        titleKey: CASE_TITLE_KEY,
        image: caseImg6,
    },
    {
        id: 7,
        variant: 'vertical',
        titleKey: CASE_TITLE_KEY,
        date: CASE_DATE,
        image: caseImg4,
    },
]
