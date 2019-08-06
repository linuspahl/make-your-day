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
import Spacer from 'shared/Spacer/Spacer'
// interfaces
import { Form as FormType, InputEvent } from 'types/types'
import { CategoryCreate } from 'store/category/type'

const Form = styled.form`
  margin-top: ${(props): string => `${props.theme.padding}rem`};
`

interface Props {
  initialData?: CategoryCreate
  mode?: FormType['mode']
  rootPath: string
  submitAction: (category: CategoryCreate) => void
}

export default class CategoryForm extends React.Component<
  Props,
  CategoryCreate
> {
  public constructor(props: Props) {
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
      this.state = { ...this.state, ...props.initialData }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.changeState = this.changeState.bind(this)
  }

  public render(): JSX.Element {
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
      <Form
        onSubmit={(event): void => {
          this.handleSubmit(event)
        }}
      >
        <IconFields
          color={color}
          handleInputChange={this.handleInputChange}
          icon={icon}
          title={title}
        />
        <Spacer />
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

  private handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.changeState)
  }

  // Some options depend on the selected type
  // This means the need to set / reset the the depending values
  private changeState(updatedEntry: CategoryCreate): void {
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
