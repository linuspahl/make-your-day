// libraries
import * as React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
import {
  evaluationTypeOptions,
  evaluationPeriodOptions,
} from '../../../config/params'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Row from 'shared/form/Row/Row'
import Input from 'shared/form/Input/Input'
// interfaces
import { CategoryFull } from 'store/category/type'
import { EvaluationCreate } from 'store/evaluation/type'
import { Form as FormType, SelectOption, InputEvent } from 'types/types'

const Form = styled.form`
  margin-top: 15px;
`

const generateCategoryOptions = (
  categories: CategoryFull[] = []
): SelectOption[] => {
  let categoryOptions: SelectOption[] = []

  categories.forEach(category => {
    categoryOptions = [
      ...categoryOptions,
      {
        value: category.id,
        title: category.title,
      },
    ]
    if (category.subcategories) {
      category.subcategories.forEach((subcategory: CategoryFull) => {
        categoryOptions = [
          ...categoryOptions,
          {
            value: subcategory.id,
            title: `${category.title} -> ${subcategory.title}`,
          },
        ]
      })
    }
  })

  return categoryOptions
}

interface Props {
  categories: CategoryFull[]
  initialData?: EvaluationCreate
  mode?: FormType['mode']
  rootPath: string
  submitAction: (evaluation: EvaluationCreate) => void
}

export default class EvaluationForm extends React.Component<
  Props,
  EvaluationCreate
> {
  public constructor(props: Props) {
    super(props)

    // overview of all form values
    // initial state create mode
    this.state = {
      title: null,
      type: null,
      groupSubcategories: false,
      period: null,
      categoryId: null,
    }

    if (props.initialData) {
      this.state = { ...this.state, ...props.initialData }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public render(): React.ReactElement {
    const { mode, rootPath, categories = [] } = this.props
    const { title, type, groupSubcategories, period, categoryId } = this.state
    const selectedCategory = categories.find(
      category => category.id === categoryId
    )
    const categoryOptions = generateCategoryOptions(categories)
    const disabledFields = {
      groupSubcategories: selectedCategory && !!selectedCategory.parentId,
    }

    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Row>
          Name
          <Input
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
          />
        </Row>
        <Row>
          Kategorie / Unterkategorie
          <ContentSelect
            name="categoryId"
            onChange={this.handleInputChange}
            options={categoryOptions}
            tabIndex={1}
            title="Kategorie / Unterkategorie"
            value={categoryId}
          />
        </Row>
        <Row>
          Gruppiere Unterkategorien
          <Checkbox
            disabled={disabledFields['groupSubcategories']}
            name="groupSubcategories"
            onChange={this.handleInputChange}
            tabIndex={1}
            value={groupSubcategories}
          />
        </Row>
        <Row>
          Art
          <ContentSelect
            name="type"
            onChange={this.handleInputChange}
            options={evaluationTypeOptions}
            tabIndex={1}
            title="Art"
            value={type}
          />
        </Row>
        <Row>
          Zeitraum
          <ContentSelect
            name="period"
            onChange={this.handleInputChange}
            options={evaluationPeriodOptions}
            tabIndex={1}
            title="Zeitraum"
            value={period}
          />
        </Row>
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
    handleInputChange(event, this.setState.bind(this))
  }
}
