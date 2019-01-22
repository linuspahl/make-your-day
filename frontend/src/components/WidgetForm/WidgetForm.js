// libraries
import React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
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

const HeadlineRow = styled(Row)`
  padding-top: 25px;
`

const typeOptions = [{ value: 'textarea', title: 'Freitext' }]

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
    const { title, type, value } = this.state
    let tabIndex = 1
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Row>
          Name
          <Input
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={tabIndex++}
            value={title}
          />
        </Row>
        <Row>
          Art
          <ContentSelect
            name="type"
            onChange={this.handleInputChange}
            options={typeOptions}
            renderPreview={option => <div />}
            tabIndex={tabIndex++}
            title="Art"
            value={type}
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
}
