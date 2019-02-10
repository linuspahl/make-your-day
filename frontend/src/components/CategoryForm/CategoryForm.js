// libraries
import React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import IconFields from './IconFields'
import RecordFields from './RecordFields'

const Form = styled.form`
  margin-top: 15px;
`

export default class CategoryForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.initialData || {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  render() {
    const { mode, rootPath } = this.props
    const {
      color,
      hasDescription,
      hasSubcategories,
      hasTitle,
      hasUnit,
      icon,
      title,
      type,
      unit,
    } = this.state

    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <IconFields
          color={color}
          icon={icon}
          title={title}
          handleInputChange={this.handleInputChange}
        />
        <RecordFields
          handleInputChange={this.handleInputChange}
          hasDescription={hasDescription}
          hasSubcategories={hasSubcategories}
          hasTitle={hasTitle}
          hasUnit={hasUnit}
          mode={mode}
          type={type}
          unit={unit}
        />
        <ActionRow>
          <Button context="secondary" tabIndex={1} to={rootPath}>
            Abbrechen
          </Button>
          <Button context="primary" tabIndex={1} type="submit">
            {mode === 'create' ? 'Erstellen' : 'Bearbeiten'}
          </Button>
        </ActionRow>
      </Form>
    )
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  handleInputChange(event) {
    handleInputChange(event, this.changeState)
  }

  // Some options depend on the selected type
  // This means the need to set / reset the the depending values
  changeState(updatedEntry) {
    const stateChanges = { ...updatedEntry }
    if (updatedEntry.type === 'counter') {
      stateChanges.hasSubcategories = false
      stateChanges.hasTitle = false
      stateChanges.hasDescription = false
    }
    if (updatedEntry.type === 'list') {
      stateChanges.hasSubcategories = false
      stateChanges.hasTitle = true
      stateChanges.hasDescription = false
    }
    this.setState({ ...stateChanges })
  }
}
