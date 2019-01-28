// libraries
import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { handleInputChange, logError } from 'utils/utils'
// graphql
import { UpdateWidget } from 'store/widget/mutation.gql'

export const Element = styled.textarea`
  width: 100%;
  height: 100%;

  padding: 10px;
  border: 1px solid ${props => props.theme.border};

  background-color: ${props => props.theme.contentBoxBg};

  color: ${props => props.theme.text};

  border-radius: 0;
`

export default class Widget extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.widget

    this.handleError = this.handleError.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
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

  handleInputChange(event) {
    handleInputChange(event, this.setState.bind(this))
  }

  // Form error function
  handleError(error) {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}
