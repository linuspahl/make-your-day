// libraries
import * as React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
// components
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import IconFields from './IconFields'
import RecordFields from './RecordFields'
// interfaces
import { Form, InputEvent } from 'types/types'
import { CategoryCreate, Category } from 'store/category/type'

const Form = styled.form`
  margin-top: 15px;
`

interface Props {
  initialData?: CategoryCreate,
  mode?: Form['mode']
  rootPath: string
  submitAction: (category: CategoryCreate) => void
}

export default class CategoryForm extends React.Component<Props, CategoryCreate> {
  constructor(props: Props) {
    super(props)

    // overview of all form values
    // initial state create mode
    this.state = {
      type: 'journal',
      icon: null,
      color: null,
      hasDescription: false,
      hasSubcategories: false,
      hasTitle: false,
      hasUnit: false,
      title: null,
    }

    if (props.initialData) {
      this.state = {...this.state, ...props.initialData}
    }

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

  handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  handleInputChange(event: InputEvent) {
    handleInputChange(event, this.changeState)
  }

  // Some options depend on the selected type
  // This means the need to set / reset the the depending values
  changeState(updatedEntry: CategoryCreate) {
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
