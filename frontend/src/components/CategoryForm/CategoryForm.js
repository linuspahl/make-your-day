// libraries
import React from 'react'
import styled from 'styled-components'
// utils
import { handleInputChange } from 'utils/utils'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Checkbox from 'shared/form/Checkbox/Checkbox'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import ColorSelect from 'shared/form/ColorSelect/ColorSelect'
import IconSelect from 'shared/form/IconSelect/IconSelect'
import Button from 'shared/Button/Button'
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'

const Form = styled.form`
  margin-top: 15px;
`

class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    if (props.initialData) {
      this.state = props.initialData
    }

    this.handleSubmit = event => {
      event.preventDefault()
      this.props.submitAction(this.state)
    }

    this.handleInputChange = event => {
      handleInputChange(event, this.setState.bind(this))
    }
  }

  render() {
    const { mode, rootPath } = this.props
    const {
      title,
      hasDescription,
      hasUnit,
      unit,
      icon,
      color,
      hasTitle,
    } = this.state
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Row>
          Shortcut Vorschau{' '}
          <CategoryIcon icon={icon} title={title} color={color} />
        </Row>
        <Row>
          Name
          <Input
            name="title"
            onChange={this.handleInputChange}
            required
            value={title}
            tabIndex={1}
          />
        </Row>
        <Row htmlFor="color">
          Farbe
          <ColorSelect
            name="color"
            onChange={this.handleInputChange}
            value={color}
            tabIndex={2}
          />
        </Row>
        <Row htmlFor="icon">
          Icon
          <IconSelect
            name="icon"
            onChange={this.handleInputChange}
            value={icon}
            tabIndex={3}
          />
        </Row>
        <Row>
          Hat Einheit
          <Checkbox
            name="hasUnit"
            onChange={this.handleInputChange}
            checked={hasUnit}
            tabIndex={4}
          />
        </Row>
        <Row disabled={!hasUnit}>
          Einheit
          <Input
            disabled={!hasUnit}
            name="unit"
            onChange={this.handleInputChange}
            required
            value={unit}
            tabIndex={5}
          />
        </Row>
        <Row>
          Hat Titel
          <Checkbox
            name="hasTitle"
            onChange={this.handleInputChange}
            value={hasTitle}
            tabIndex={6}
          />
        </Row>
        <Row>
          Hat Beschreibung
          <Checkbox
            name="hasDescription"
            onChange={this.handleInputChange}
            value={hasDescription}
            tabIndex={7}
          />
        </Row>
        <ActionRow>
          <Button to={rootPath} context="secondary" tabIndex={8}>
            Abbrechen
          </Button>
          <Button type="submit" context="primary" tabIndex={9}>
            {mode === 'create' ? 'Erstellen' : 'Bearbeiten'}
          </Button>
        </ActionRow>
      </Form>
    )
  }
}

export default CategoryForm