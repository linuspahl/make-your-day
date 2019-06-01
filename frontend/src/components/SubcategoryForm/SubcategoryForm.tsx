// libraries
import * as React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Button from 'shared/Button/Button'
// interfaces
import { SubcategoryCreate, CategoryFull } from 'store/category/type'
import { Form as FormType, InputEvent } from 'types/types'

const Form = styled.form`
  margin-top: 15px;
`

interface Props {
  initialData?: SubcategoryCreate
  mode?: FormType['mode']
  parentCategory: CategoryFull
  rootPath: string
  submitAction: (category: SubcategoryCreate) => void
}

export default class SubcategoryForm extends React.Component<
  Props,
  SubcategoryCreate
> {
  public constructor(props: Props) {
    super(props)

    // overview of all form values
    // initial state create mode
    this.state = {
      parentId: props.parentCategory.id,
      title: null,
    }

    if (props.initialData) {
      this.state = { ...this.state, ...props.initialData }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public render(): JSX.Element {
    const { mode, rootPath } = this.props
    const { title } = this.state
    return (
      <Form onSubmit={(event): void => this.handleSubmit(event)}>
        <Row>
          Titel
          <Input
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
          />
        </Row>
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

  private handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.setState.bind(this))
  }
}
