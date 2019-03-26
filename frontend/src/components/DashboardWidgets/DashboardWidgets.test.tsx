// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DashboardWidgets from './DashboardWidgets'
// fixtures
import { widget } from 'store/widget/fixtures'

describe('DashboardWidgets should', () => {
  test('render without crashing', () => {
    ShallowRenderer.createRenderer().render(<DashboardWidgets createNotificationBanner={() => {}} loading={false} widgets={[widget]}/>)
  })
})
