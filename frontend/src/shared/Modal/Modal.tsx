// libraries
import * as React from 'react'
// components
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import CloseIcon from 'shared/CloseIcon/CloseIcon'
import H1 from 'shared/H1/H1'
import {
  Wrapper,
  Offset,
  ContentWrapper,
  Head,
  Content,
  CloseIconWrapper,
} from './styles'

interface Props {
  children: React.ReactNode
  headline?: string
  toggleAction: () => void
}

export default class Modal extends React.Component<Props> {
  render() {
    const { toggleAction, children, headline } = this.props
    return (
      <FadeTransition fullHeight>
        <Wrapper>
          <Offset onClick={() => toggleAction()} />
          <ContentWrapper>
            <Content>
              <Head>
                {headline && <H1>{headline}</H1>}
                <CloseIconWrapper>
                  <CloseIcon closeAction={toggleAction} />
                </CloseIconWrapper>
              </Head>
              {children}
            </Content>
          </ContentWrapper>
        </Wrapper>
      </FadeTransition>
    )
  }
}