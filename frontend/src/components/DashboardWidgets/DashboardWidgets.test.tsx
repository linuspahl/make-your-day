// libraries
import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow'
// components
import DashboardWidgets from './DashboardWidgets'
// fixtures
import { widget } from 'store/widget/fixtures'

describe('DashboardWidgets should', (): void => {
  test('render without crashing', (): void => {
    ShallowRenderer.createRenderer().render(
      <DashboardWidgets
        createNotificationBanner={(): void => {}}
        loading={false}
        widgets={[widget]}
      />
    )
  })
})
