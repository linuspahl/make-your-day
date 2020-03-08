// libraries
import React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'
// interfaces
import { InputEvent } from 'types/types'

import { categoryIcons } from 'params'

interface Props {
  disabled?: boolean
  id?: string
  name: string
  onChange: (event: InputEvent) => void
  required?: boolean
  tabIndex: number
  value: string
}

const IconSelect = ({
  disabled,
  id,
  name,
  onChange,
  required,
  tabIndex,
  value,
}: Props): JSX.Element => (
  <ContentSelect
    allowEmpty
    disabled={disabled}
    id={id}
    label="Icon"
    name={name}
    onChange={onChange}
    options={categoryIcons}
    renderPreview={(option): JSX.Element => (
      <Icon title={String(option.value)} />
    )}
    required={required}
    tabIndex={tabIndex}
    value={value}
  />
)

export default IconSelect
