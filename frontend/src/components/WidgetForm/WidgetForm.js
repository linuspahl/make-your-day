// libraries
import React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
import {
  widgetTypeOptions,
  widgetPositionOptions,
} from '../../../config/params'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Textarea from 'shared/form/Textarea/Textarea'
import Button from 'shared/Button/Button'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'

const Form = styled.form`
  margin-top: 15px;
`

const generateEvaluationOptions = categories => {
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

export default class WidgetForm extends React.Component {
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
    const { mode, rootPath, evaluations } = this.props
    const { title, type, value, position, evaluationId } = this.state

    const evaluationOptions = generateEvaluationOptions(evaluations)
    const disabledFields = {
      type: mode !== 'create',
      evaluationId: type !== 'evaluation',
      disabledFields: type !== 'textarea',
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
        <Row disabled={disabledFields['type']}>
          Art
          <ContentSelect
            disabled={disabledFields['type']}
            name="type"
            onChange={this.handleInputChange}
            options={widgetTypeOptions}
            tabIndex={1}
            title="Art"
            value={type}
          />
        </Row>
        <Row disabled={disabledFields['evaluationId']}>
          Auswertung
          <ContentSelect
            disabled={disabledFields['evaluationId']}
            name="evaluationId"
            onChange={this.handleInputChange}
            options={evaluationOptions}
            tabIndex={1}
            title="Auswertung"
            value={evaluationId}
          />
        </Row>
        <Row>
          Position
          <ContentSelect
            name="position"
            onChange={this.handleInputChange}
            options={widgetPositionOptions}
            tabIndex={1}
            title="Position"
            value={position}
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
}
