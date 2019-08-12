// params
import { navigationItems } from 'params'
// libraries
import React from 'react'
// components
import { Wrapper, Offset, CloseIconWrapper, Head } from './styles'
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import H1 from 'shared/H1/H1'
import NavigationItem from 'components/NavigationItem/NavigationItem'
// interfaces
import { NavigationState } from 'types/types'

interface Props {
  rootPath: string
  state: NavigationState
  toggleAction: () => void
}

const Navigation = (props: Props): JSX.Element => {
  const { toggleAction, rootPath, state } = props
  return (
    <React.Fragment>
      {state.open && <Offset onClick={(): void => toggleAction()} />}
      <Wrapper state={state}>
        <Head>
          <H1>Menü</H1>
          <CloseIconWrapper>
            <CloseIcon closeAction={(): void => toggleAction()} />
          </CloseIconWrapper>
        </Head>
        <ul>
          {navigationItems.map(
            (route): JSX.Element => (
              <NavigationItem
                key={route.path}
                route={route}
                rootPath={rootPath}
              />
            )
          )}
        </ul>
      </Wrapper>
    </React.Fragment>
  )
}

export default Navigation
