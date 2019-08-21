// File for all static content, that is not related to the config
import { CategoryColors, SelectOption } from 'types/types'

export const navigationItems = [
  { path: '/', title: 'Dashboard' },
  { path: '/categories', title: 'Kategorien verwalten' },
  { path: '/widgets', title: 'Widgets verwalten' },
  { path: '/evaluations', title: 'Auswertungen verwalten' },
  { path: '/settings', title: 'Einstellungen' },
]

export const localStorageKeys = [
  'authToken',
  'expiresAt',
  'leftHandMode',
  'nightMode',
  'showAppBgImage',
  'userId',
  'userSessionId',
]

export const weekDayLabels: { [key: string]: string } = {
  0: 'So',
  1: 'Mo',
  2: 'Di',
  3: 'Mi',
  4: 'Do',
  5: 'Fr',
  6: 'Sa',
}

export const categoryColors: CategoryColors = {
  navy: '#001f3f',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144b',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  black: '#111111',
  gray: '#AAAAAA',
  silver: '#DDDDDD',
}

export const categoryTextColors: CategoryColors = {
  navy: '#80bfff',
  blue: '#b3dbff',
  aqua: '#004966',
  teal: '#000',
  olive: '#163728',
  green: '#0e3e14',
  lime: '#00662c',
  yellow: '#665800',
  orange: '#663000',
  red: '#800600',
  maroon: '#eb7ab1',
  fuchsia: '#65064f',
  purple: '#efa9f9',
  black: '#ddd',
  gray: '#000',
  silver: '#000',
}

export const categoryTypeOptions: SelectOption[] = [
  { value: 'journal', title: 'Journal' },
  { value: 'list', title: 'Liste' },
  { value: 'counter', title: 'Zähler' },
]

export const categoryIcons: SelectOption[] = [
  { value: 'glass', title: 'Glass' },
  { value: 'car', title: 'Auto' },
  { value: 'archive', title: 'Box' },
  { value: 'at', title: '@' },
  { value: 'check', title: 'Checkmark' },
  { value: 'book', title: 'Buch' },
  { value: 'gift', title: 'Geschenk' },
  { value: 'bicycle', title: 'Fahrrad' },
  { value: 'eur', title: '€' },
  { value: 'cutlery', title: 'Messer und Gabel' },
  { value: 'balance-scale', title: 'Wage' },
  { value: 'home', title: 'Haus' },
  { value: 'clock-o', title: 'Uhr' },
  { value: 'tv', title: 'TV' },
  { value: 'money', title: 'Geld' },
]

export const widgetTypeOptions: SelectOption[] = [
  { value: 'textarea', title: 'Freitext' },
  { value: 'evaluation', title: 'Auswertung' },
  { value: 'timeline', title: 'Timeline' },
]

export const widgetPositionOptions: SelectOption[] = [
  { value: 'dashboard-top', title: 'Dashboard oben' },
  { value: 'dashboard-bottom', title: 'Dashboard unten' },
]

export const evaluationTypeOptions: SelectOption[] = [
  { value: 'linechart', title: 'Liniendiagram' },
  { value: 'piechart', title: 'Kuchendiagram' },
]

export const evaluationPeriodOptions: SelectOption[] = [
  { value: 'day', title: 'Dieser Tag' },
  { value: 'week', title: 'Diese Woche' },
  { value: 'lastDay', title: 'Vergange 24 Stunden' },
  { value: 'lastWeek', title: 'Vergange 7 Tage' },
]
