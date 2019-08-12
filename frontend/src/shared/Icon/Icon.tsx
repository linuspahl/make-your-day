// Default Icon component
// Can be used with all line awesome icons https://icons8.com/line-awesome
// All stylings like font-size or color should be defined in the parent component.
// This is more flexible then creating a prop for every possible styling attribute

// libraries
import React from 'react'

interface Props {
  title: string
}

const Icon = (props: Props): JSX.Element => (
  <i className={`la la-${props.title}`} data-testid="Icon" />
)

export default Icon
