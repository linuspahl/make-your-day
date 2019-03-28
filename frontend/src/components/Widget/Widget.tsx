// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { handleInputChange, logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
// graphql
import { UpdateWidget } from 'store/widget/mutation'
// interfaces
import { Widget as WidgetType } from 'store/widget/type'
import { InputEvent, NotificationCreate } from 'types/types'

export const Element = styled.textarea`
  width: 100%;
  height: 100%;

  padding: 20px;
  border: 1px solid ${props => props.theme.border};
  border-radius: 0;

  background-color: ${props => props.theme.contentBoxBg};

  color: ${props => props.theme.text};
  line-height: 1.4;
`

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  widget: WidgetType
}

export default class Widget extends React.Component<Props, WidgetType> {
  public constructor(props: Props) {
    super(props)

    this.state = props.widget

    this.handleError = this.handleError.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public render(): React.ReactElement {
    const { value, title } = this.state
    return (
      <Mutation mutation={UpdateWidget} onError={this.handleError}>
        {updateWidget => (
          <Element
            defaultValue={value}
            name="value"
            placeholder={title}
            onBlur={() => updateWidget({ variables: this.state })}
            onChange={this.handleInputChange}
          />
        )}
      </Mutation>
    )
  }

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.setState.bind(this))
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}
