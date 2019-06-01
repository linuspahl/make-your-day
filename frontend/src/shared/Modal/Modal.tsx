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
  public render(): React.ReactNode {
    const { toggleAction, children, headline } = this.props
    return (
      <Wrapper>
        <FadeTransition fullHeight>
          <Offset onClick={(): void => toggleAction()} />
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
        </FadeTransition>
      </Wrapper>
    )
  }
}
