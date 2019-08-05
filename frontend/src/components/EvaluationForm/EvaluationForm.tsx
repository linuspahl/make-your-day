// libraries
import * as React from 'react'
import styled from 'styled-components'
import { sortBy } from 'lodash'
// utils
import { handleInputChange } from 'utils/utils'
import { evaluationTypeOptions, evaluationPeriodOptions } from 'params'
// components
import Checkbox from 'shared/form/Checkbox/Checkbox'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Row from 'shared/form/Row/Row'
import Input from 'shared/form/Input/Input'
// interfaces
import { CategoryForListWithChildren, Subcategory } from 'store/category/type'
import { EvaluationCreate, EvaluationEdit } from 'store/evaluation/type'
import { Form as FormType, SelectOption, InputEvent } from 'types/types'

const Form = styled.form`
  margin-top: ${(props): string => `${props.theme.padding}rem`};
`

const generateCategoryOptions = (
  categories: CategoryForListWithChildren[] = []
): SelectOption[] => {
  let categoryOptions: SelectOption[] = []

  sortBy(categories, 'title').forEach((category): void => {
    categoryOptions = [
      ...categoryOptions,
      {
        value: category.id,
        title: category.title,
      },
    ]

    if (category.subcategories) {
      sortBy(category.subcategories, 'title').forEach(
        (subcategory: Subcategory): void => {
          categoryOptions = [
            ...categoryOptions,
            {
              value: subcategory.id,
              title: `${category.title} -> ${subcategory.title}`,
            },
          ]
        }
      )
    }
  })

  return categoryOptions
}

interface Props {
  categories: CategoryForListWithChildren[]
  initialData?: EvaluationCreate | EvaluationEdit
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

  public render(): JSX.Element {
    const { mode, rootPath, categories = [] } = this.props
    const { title, type, groupSubcategories, period, categoryId } = this.state
    const selectedCategory = categories.find(
      (category): boolean => category.id == categoryId
    )
    const categoryOptions = generateCategoryOptions(categories)
    const disabledFields = {
      groupSubcategories:
        selectedCategory &&
        (!selectedCategory.subcategories ||
          selectedCategory.subcategories.length == 0),
    }

    return (
      <Form onSubmit={(event): void => this.handleSubmit(event)}>
        <Row htmlFor="title">
          <Input
            id="title"
            label="Name"
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
          />
        </Row>
        <Row htmlFor="categoryId">
          <ContentSelect
            id="categoryId"
            label="Kategorie / Unterkategorie"
            name="categoryId"
            onChange={this.handleInputChange}
            options={categoryOptions}
            tabIndex={1}
            value={Number(categoryId)}
          />
        </Row>
        <Row htmlFor="groupSubcategories">
          Gruppiere Unterkategorien
          <Checkbox
            disabled={disabledFields['groupSubcategories']}
            id="groupSubcategories"
            name="groupSubcategories"
            onChange={this.handleInputChange}
            tabIndex={1}
            value={groupSubcategories}
          />
        </Row>
        <Row htmlFor="type">
          <ContentSelect
            id="type"
            name="type"
            onChange={this.handleInputChange}
            options={evaluationTypeOptions}
            tabIndex={1}
            label="Art"
            value={type}
          />
        </Row>
        <Row htmlFor="period">
          <ContentSelect
            id="period"
            label="Zeitraum"
            name="period"
            onChange={this.handleInputChange}
            options={evaluationPeriodOptions}
            tabIndex={1}
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
