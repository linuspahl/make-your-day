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

    let tabIndex = 1

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
          <Button context="secondary" tabIndex={tabIndex++} to={rootPath}>
            Abbrechen
          </Button>
          <Button context="primary" tabIndex={tabIndex++} type="submit">
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
    handleInputChange(event, this.setState.bind(this))
  }
}
