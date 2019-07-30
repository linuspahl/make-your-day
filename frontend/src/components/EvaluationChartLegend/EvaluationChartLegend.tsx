// libraries
import * as React from 'react'
// components
import { Wrapper, ColorPreview, CategoryName, CategoryWrapper } from './styles'
// interface
import { EvaluationFull } from 'store/evaluation/type'

interface Props {
  evaluation: EvaluationFull
}

interface EvaluationCategory {
  color: string
  title: string
}

function getCategories(props: Props): object[] {
  const {
    evaluation: {
      type,
      result: { series },
    },
  } = props
  const seriesColorsMix = series.map((ser): EvaluationCategory[] => {
    if (type === 'piechart' && ser.data && ser.data.length !== 0) {
      return ser.data.map(
        (category): EvaluationCategory => ({
          color: category.color,
          title: category.title,
        })
      )
    }
    return [{ color: ser.color, title: ser.title }]
  })
  return Array.prototype.concat.apply([], seriesColorsMix)
}

const EvaluationChart = (props: Props): JSX.Element => {
  const categories = getCategories(props)

  return (
    <Wrapper>
      {categories.map(
        (category: EvaluationCategory): JSX.Element => {
          return (
            <CategoryWrapper key={category.title}>
              <ColorPreview color={category.color}></ColorPreview>
              <CategoryName>{category.title}</CategoryName>
            </CategoryWrapper>
          )
        }
      )}
    </Wrapper>
  )
}

export default EvaluationChart
