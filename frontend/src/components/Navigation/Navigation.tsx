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
  animateOnClose: NavigationState['animateOnClose']
  open: NavigationState['open']
  toggleAction: () => void
}

const Navigation = ({
  animateOnClose,
  open,
  rootPath,
  toggleAction,
}: Props): JSX.Element => (
  <>
    {open && <Offset onClick={(): void => toggleAction()} />}
    <Wrapper open={open} animateOnClose={animateOnClose}>
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
  </>
)

export default Navigation
