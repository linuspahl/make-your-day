import { handleInputChange } from './utils'

describe('utils', () => {
  describe('handleInputChange ', () => {
    test('input event', () => {
      const event = { target: { name: 'username', value: 'Admin' } }
      const callback = (params: { [key: string]: string }) => {
        expect(params).toEqual({ username: 'Admin' })
      }
      handleInputChange(event, callback)
    })
    test('checkbox event', () => {
      const event = {
        target: { name: 'newsletter', checked: true, type: 'checkbox' },
      }
      const callback = (params: { [key: string]: string }) => {
        expect(params).toEqual({ newsletter: true })
      }
      handleInputChange(event, callback)
    })
  })
})
