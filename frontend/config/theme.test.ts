import colorTheme, { nightModeTheme, defaultTheme } from './theme'

describe('theme', (): void => {
  test('should return default colors', (): void => {
    const theme = colorTheme()
    expect(theme.primary).toEqual(defaultTheme.primary)
  })
  test('should return different colors for nightmode', (): void => {
    const theme = colorTheme({ nightMode: true })
    expect(theme.primary).toEqual(nightModeTheme.primary)
  })
})
