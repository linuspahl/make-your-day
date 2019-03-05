// libraries
import React from 'react'
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

const Form = styled.form`
  margin-top: 15px;
`

const generateCategoryOptions = categories => {
  let categoryOptions = []

  if (!categories || categories.length === 0) {
    return categoryOptions
  }

  categories.forEach(category => {
    categoryOptions = [
      ...categoryOptions,
      {
        value: category.id,
        title: category.title,
      },
    ]
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
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

export default class CategoryForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.initialData || {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
    const { mode, rootPath, categories } = this.props
    const { title, type, groupSubcategories, period, categoryId } = this.state

    const categoryOptions = generateCategoryOptions(categories)
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
          Gruppiere Unterkategorien
          <Checkbox
            name="groupSubcategories"
            onChange={this.handleInputChange}
            tabIndex={1}
            value={groupSubcategories}
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

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  handleInputChange(event) {
    handleInputChange(event, this.setState)
  }
}
