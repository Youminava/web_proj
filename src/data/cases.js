import caseImg1 from '../assets/img/case-1.jpg'
import caseImg2 from '../assets/img/case-4.jpg'
import caseImg3 from '../assets/img/case-3.jpg'
import caseImg4 from '../assets/img/case-5.jpg'
import caseImg5 from '../assets/img/case-2.jpg'
import caseImg6 from '../assets/img/case-6.jpg'

const CASE_DATE = '22.04.2019'
const CASE_TITLE = 'Проект на Drupal'
const CASE_DESCRIPTION = 'Успешная разработка и поддержка сайта на Drupal'

export const cases = [
    {
        id: 1,
        variant: 'description',
        title: CASE_TITLE,
        date: CASE_DATE,
        description: CASE_DESCRIPTION,
        image: caseImg1,
    },
    {
        id: 2,
        variant: 'wide',
        title: CASE_TITLE,
        image: caseImg5,
    },
    {
        id: 3,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg3,
    },
    {
        id: 4,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg2,
    },
    {
        id: 5,
        variant: 'description',
        title: CASE_TITLE,
        date: CASE_DATE,
        description: CASE_DESCRIPTION,
        image: caseImg4,
    },
    {
        id: 6,
        variant: 'wide',
        title: CASE_TITLE,
        image: caseImg6,
    },
    {
        id: 7,
        variant: 'vertical',
        title: CASE_TITLE,
        date: CASE_DATE,
        image: caseImg4,
    },
    {
        id: 8,
        variant: 'description',
        title: 'Настройка выгрузки YML для Яндекс.Маркета',
        date: '22.04.2019',
        description: 'Эти слова совершенно справедливы, однако гипнотический рифф продолжает паузный пласт.',
        image: caseImg1,
    },
]
