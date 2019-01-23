// libraries
import React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Button from 'shared/Button/Button'
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'

const Form = styled.form`
  margin-top: 15px;
`

export default class RecordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    if (props.initialData) this.state = props.initialData

    this.handleSubmit = event => {
      event.preventDefault()
      this.props.submitAction(this.state)
    }

    this.handleInputChange = event =>
      handleInputChange(event, this.setState.bind(this))
  }

  render() {
    const {
      mode,
      rootPath,
      category: {
        color,
        hasDescription,
        hasSubcategories,
        hasTitle,
        hasUnit,
        icon,
        unit,
      },
    } = this.props
    const { title, type, amount } = this.state
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        {hasTitle && (
          <Row>
            Titel
            <Input
              name="title"
              onChange={this.handleInputChange}
              required
              value={title}
            />
          </Row>
        )}
        {hasDescription && (
          <Row>
            Beschreibung
            <Input
              name="description"
              onChange={this.handleInputChange}
              value={description}
              required
            />
          </Row>
        )}
        {hasUnit && (
          <Row>
            Einheit ({unit})
            <Input
              name="amount"
              onChange={this.handleInputChange}
              value={amount}
              required
            />
          </Row>
        )}
        <ActionRow>
          <Button context="secondary" to={rootPath}>
            Abbrechen
          </Button>
          <Button context="primary" type="submit">
            {mode === 'create' ? 'Erstellen' : 'Bearbeiten'}
          </Button>
        </ActionRow>
      </Form>
    )
  }
}
