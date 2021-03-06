// libraries
import React from 'react'
// components
import H2 from 'shared/H2/H2'
import Row from 'shared/form/Row/Row'
import Input from 'shared/form/Input/Input'
import ColorSelect from 'shared/form/ColorSelect/ColorSelect'
import IconSelect from 'shared/form/IconSelect/IconSelect'
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
// interface
import { Category } from 'store/category/type'
import { InputEvent } from 'types/types'

interface Props {
  color?: Category['color']
  handleInputChange: (event: InputEvent) => void
  icon?: Category['icon']
  title: Category['title']
}

const IconFields = ({
  color,
  handleInputChange,
  icon,
  title,
}: Props): JSX.Element => (
  <div>
    <Row>
      <H2>Ansicht Icon</H2>
      <CategoryIcon color={color} icon={icon} title={title} />
    </Row>
    <Row htmlFor="title">
      <Input
        name="title"
        id="title"
        label="Name"
        onChange={handleInputChange}
        required
        tabIndex={1}
        value={title}
      />
    </Row>
    <Row htmlFor="color">
      <ColorSelect
        id="color"
        name="color"
        onChange={handleInputChange}
        tabIndex={1}
        value={color}
      />
    </Row>
    <Row htmlFor="icon">
      <IconSelect
        id="icon"
        name="icon"
        onChange={handleInputChange}
        tabIndex={1}
        value={icon}
      />
    </Row>
  </div>
)

export default IconFields
