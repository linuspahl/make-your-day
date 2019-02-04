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
import ColorSelect from 'shared/form/ColorSelect/ColorSelect'
import IconSelect from 'shared/form/IconSelect/IconSelect'
import Button from 'shared/Button/Button'
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'

const Form = styled.form`
  margin-top: 15px;
`

const HeadlineRow = styled(Row)`
  padding-top: 25px;
`

const typeOptions = [
  { value: 'journal', title: 'Journal' },
  { value: 'list', title: 'Liste' },
  { value: 'counter', title: 'Zähler' },
]

export default class CategoryForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = props.initialData || {}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render() {
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
    let tabIndex = 1
    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Row>
          <b>Ansicht Icon</b>
          <CategoryIcon color={color} icon={icon} title={title} />
        </Row>
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
        <Row htmlFor="color">
          Farbe
          <ColorSelect
            name="color"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={color}
          />
        </Row>
        <Row htmlFor="icon">
          Icon
          <IconSelect
            name="icon"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={icon}
          />
        </Row>
        <HeadlineRow>
          <b>Aufbau Einträge</b>
        </HeadlineRow>
        <Row disabled={mode !== 'create'}>
          Art
          <ContentSelect
            disabled={mode !== 'create'}
            name="type"
            onChange={this.handleInputChange}
            options={typeOptions}
            renderPreview={option => <div />}
            tabIndex={tabIndex++}
            title="Art"
            value={type}
          />
        </Row>
        <Row disabled={mode !== 'create' || type !== 'journal'}>
          Auswahl Unterkategorie
          <Checkbox
            name="hasSubcategories"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={type === 'journal' ? hasSubcategories : false}
            disabled={mode !== 'create' || type !== 'journal'}
          />
        </Row>
        <Row disabled={mode !== 'create' || type === 'counter'}>
          Haben Einheit
          <Checkbox
            disabled={mode !== 'create' || type === 'counter'}
            name="hasUnit"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={type !== 'counter' ? hasUnit : false}
          />
        </Row>
        <Row disabled={!hasUnit || type === 'counter'}>
          Einheit
          <Input
            disabled={!hasUnit || type === 'counter'}
            name="unit"
            onChange={this.handleInputChange}
            required
            tabIndex={tabIndex++}
            value={type !== 'counter' ? unit : null}
          />
        </Row>
        <Row disabled={type === 'counter'}>
          Haben Titel
          <Checkbox
            name="hasTitle"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={
              type === 'counter' ? false : type === 'journal' ? hasTitle : true
            }
          />
        </Row>
        <Row disabled={type !== 'journal'}>
          Haben Beschreibung
          <Checkbox
            disabled={type !== 'journal'}
            name="hasDescription"
            onChange={this.handleInputChange}
            tabIndex={tabIndex++}
            value={type === 'journal' ? hasDescription : false}
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

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  handleInputChange(event) {
    handleInputChange(event, this.setState.bind(this))
  }
}
