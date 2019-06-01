import { handleInputChange } from './utils'

describe('utils', (): void => {
  describe('handleInputChange ', (): void => {
    test('input event', (): void => {
      const event = { target: { name: 'username', value: 'Admin' } }
      const callback = (params: { [key: string]: string }): void => {
        expect(params).toEqual({ username: 'Admin' })
      }
      handleInputChange(event, callback)
    })
    test('checkbox event', (): void => {
      const event = {
        target: { name: 'newsletter', checked: true, type: 'checkbox' },
      }
      const callback = (params: { [key: string]: string }): void => {
        expect(params).toEqual({ newsletter: true })
      }
      handleInputChange(event, callback)
    })
  })
})
