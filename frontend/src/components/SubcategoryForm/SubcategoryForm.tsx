// libraries
import React from 'react'
// utils
import { handleInputChange } from 'utils/utils'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Button from 'shared/Button/Button'
// interfaces
import { SubcategoryCreate } from 'store/category/type'
import { Form as FormType, InputEvent } from 'types/types'
import ColorSelect from 'shared/form/ColorSelect/ColorSelect'

interface Props {
  initialData?: SubcategoryCreate
  mode?: FormType['mode']
  parentCategoryId: string
  rootPath: string
  submitAction: (variables: SubcategoryCreate) => void
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
      parentId: props.parentCategoryId,
      title: null,
      color: null,
    }

    if (props.initialData) {
      this.state = { ...this.state, ...props.initialData }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public render(): JSX.Element {
    const { mode, rootPath } = this.props
    const { title, color } = this.state
    return (
      <form onSubmit={(event): void => this.handleSubmit(event)}>
        <Row htmlFor="title">
          <Input
            id="title"
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
            label="Name"
          />
        </Row>
        <Row htmlFor="color">
          <ColorSelect
            id="color"
            name="color"
            onChange={this.handleInputChange}
            tabIndex={1}
            value={color}
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
      </form>
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
