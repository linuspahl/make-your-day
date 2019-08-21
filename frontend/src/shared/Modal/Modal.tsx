// libraries
import React from 'react'
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
  context?: 'page'
  toggleAction: (event: React.MouseEvent<HTMLElement>) => void
}

export default class Modal extends React.Component<Props> {
  public render(): React.ReactNode {
    const { toggleAction, children, headline, context } = this.props
    return (
      <Wrapper data-testid="Modal">
        <FadeTransition fullHeight>
          <Offset
            onClick={(event: React.MouseEvent<HTMLElement>): void =>
              toggleAction(event)
            }
            data-testid="Modal-offset"
          />
          <ContentWrapper>
            <Content context={context}>
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
