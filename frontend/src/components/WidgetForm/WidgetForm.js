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
    const { mode, rootPath } = this.props
    const { title, type, value, position } = this.state

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
          Art
          <ContentSelect
            name="type"
            onChange={this.handleInputChange}
            options={widgetTypeOptions}
            tabIndex={1}
            title="Art"
            value={type}
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
        <Row disabled={type !== 'textarea'}>
          Inhalt
          <Textarea
            name="value"
            onChange={this.handleInputChange}
            disabled={type !== 'textarea'}
            value={value}
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
