// libraries
import * as React from 'react'
// components
import { Wrapper, Checkmark, Element } from './styles'
import Icon from 'shared/Icon/Icon'
// interfaces
import { InputEvent } from 'types/types'
import { MutationOptions } from 'react-apollo'

interface Props {
  disabled?: boolean
  id?: string
  name: string
  onChange: (event: InputEvent | MutationOptions) => void
  tabIndex: number
  value: boolean
}

const Checkbox = (props: Props): JSX.Element => {
  const { value, onChange, id, name, disabled, tabIndex } = props
  return (
    <Wrapper disabled={disabled} data-testid="Checkbox">
      {value && (
        <Checkmark>
          <Icon title="check" />
        </Checkmark>
      )}
      <Element
        checked={value || false}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        tabIndex={tabIndex}
        type="checkbox"
      />
    </Wrapper>
  )
}

export default Checkbox
