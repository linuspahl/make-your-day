// libraries
import * as React from 'react'
// components
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
import Icon from 'shared/Icon/Icon'
// interfaces
import { InputEvent } from 'types/types'

import { categoryIcons } from '../../../../config/params'

interface Props {
  disabled?: boolean
  name: string
  onChange: (event: InputEvent) => void
  tabIndex: number
  value: string
}

const IconSelect = (props: Props): React.ReactElement => {
  const { value, onChange, name, tabIndex, disabled } = props

  return (
    <ContentSelect
      allowEmpty
      disabled={disabled}
      name={name}
      onChange={onChange}
      options={categoryIcons}
      renderPreview={(option): JSX.Element => (
        <Icon title={String(option.value)} />
      )}
      tabIndex={tabIndex}
      title="Icon"
      value={value}
    />
  )
}

export default IconSelect
