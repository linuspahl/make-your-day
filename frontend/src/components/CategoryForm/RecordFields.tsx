// libraries
import React from 'react'
import styled from 'styled-components'
// components
import Row from 'shared/form/Row/Row'
import Input from 'shared/form/Input/Input'
import Checkbox from 'shared/form/Checkbox/Checkbox'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import H2 from 'shared/H2/H2'
// params
import { categoryTypeOptions } from 'params'
// interface
import { Category } from 'store/category/type'
import { Form, InputEvent } from 'types/types'

const HeadlineRow = styled(Row)`
  padding-top: ${(props): string => `${props.theme.padding}rem`};
`

interface Props {
  handleInputChange: (event: InputEvent) => void
  hasDescription: Category['hasDescription']
  hasSubcategories: Category['hasSubcategories']
  hasTitle: Category['hasTitle']
  hasUnit: Category['hasUnit']
  mode?: Form['mode']
  type: Category['type']
  unit?: Category['unit']
}

const RecordFields = (props: Props): JSX.Element => {
  const {
    handleInputChange,
    hasDescription,
    hasSubcategories,
    hasTitle,
    hasUnit,
    mode,
    type,
    unit,
  } = props

  // We need to disable some fields for some conditions
  // E.g. some fields can't be changed after the category creation
  const isUpdateMode = mode !== 'create'
  const disabledFields = {
    type: isUpdateMode,
    hasSubcategories: isUpdateMode || type !== 'journal',
    hasUnit: isUpdateMode,
    unit: !hasUnit || isUpdateMode,
    hasDescription: type !== 'journal',
    hasTitle: type === 'counter' || type === 'list',
  }

  return (
    <div>
      <HeadlineRow>
        <H2>Aufbau Einträge</H2>
      </HeadlineRow>
      <Row disabled={disabledFields.type} htmlFor="type">
        <ContentSelect
          disabled={disabledFields.type}
          id="type"
          label="Art"
          name="type"
          onChange={handleInputChange}
          options={categoryTypeOptions}
          required
          tabIndex={1}
          value={type}
        />
      </Row>
      <Row
        disabled={disabledFields.hasSubcategories}
        htmlFor="hasSubcategories"
      >
        <Checkbox
          label="Auswahl Unterkategorie"
          disabled={disabledFields.hasSubcategories}
          id="hasSubcategories"
          name="hasSubcategories"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasSubcategories}
        />
      </Row>
      <Row disabled={disabledFields.hasUnit} htmlFor="hasUnit">
        <Checkbox
          disabled={disabledFields.hasUnit}
          label="Haben Einheit"
          name="hasUnit"
          id="hasUnit"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasUnit}
        />
      </Row>
      <Row disabled={disabledFields.unit} htmlFor="unit">
        <Input
          disabled={disabledFields.unit}
          label="Einheit"
          name="unit"
          id="unit"
          onChange={handleInputChange}
          required
          tabIndex={1}
          value={unit}
        />
      </Row>
      <Row disabled={disabledFields.hasTitle} htmlFor="hasTitle">
        <Checkbox
          disabled={disabledFields.hasTitle}
          label="Haben Titel"
          name="hasTitle"
          id="hasTitle"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasTitle}
        />
      </Row>
      <Row disabled={disabledFields.hasDescription} htmlFor="hasDescription">
        <Checkbox
          disabled={disabledFields.hasDescription}
          label="Haben Beschreibung"
          name="hasDescription"
          id="hasDescription"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasDescription}
        />
      </Row>
    </div>
  )
}

export default RecordFields
