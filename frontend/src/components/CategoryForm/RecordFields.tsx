// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import Row from 'shared/form/Row/Row'
import Input from 'shared/form/Input/Input'
import Checkbox from 'shared/form/Checkbox/Checkbox'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import H2 from 'shared/H2/H2'
// params
import { categoryTypeOptions } from '../../../config/params'
// interface
import { Category } from 'store/category/type'
import { Form, InputEvent } from 'types/types'

const HeadlineRow = styled(Row)`
  padding-top: 25px;
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

const RecordFields = (props: Props) => {
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
      <Row disabled={disabledFields.type}>
        Art
        <ContentSelect
          disabled={disabledFields.type}
          name="type"
          onChange={handleInputChange}
          options={categoryTypeOptions}
          tabIndex={1}
          title="Art"
          value={type}
        />
      </Row>
      <Row disabled={disabledFields.hasSubcategories}>
        Auswahl Unterkategorie
        <Checkbox
          disabled={disabledFields.hasSubcategories}
          name="hasSubcategories"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasSubcategories}
        />
      </Row>
      <Row disabled={disabledFields.hasUnit}>
        Haben Einheit
        <Checkbox
          disabled={disabledFields.hasUnit}
          name="hasUnit"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasUnit}
        />
      </Row>
      <Row disabled={disabledFields.unit}>
        Einheit
        <Input
          disabled={disabledFields.unit}
          name="unit"
          onChange={handleInputChange}
          required
          tabIndex={1}
          value={unit}
        />
      </Row>
      <Row disabled={disabledFields.hasTitle}>
        Haben Titel
        <Checkbox
          disabled={disabledFields.hasTitle}
          name="hasTitle"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasTitle}
        />
      </Row>
      <Row disabled={disabledFields.hasDescription}>
        Haben Beschreibung
        <Checkbox
          disabled={disabledFields.hasDescription}
          name="hasDescription"
          onChange={handleInputChange}
          tabIndex={1}
          value={hasDescription}
        />
      </Row>
    </div>
  )
}

export default RecordFields