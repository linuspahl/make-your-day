// libraries
import React from 'react'
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

function getCategories({
  evaluation: {
    type,
    result: { series },
  },
}: Props): object[] {
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

const EvaluationChartLegend = (props: Props): JSX.Element => {
  const categories = getCategories(props)

  return (
    <Wrapper>
      {categories.map(
        (category: EvaluationCategory, index: number): JSX.Element => {
          // Notmally the iteration index shoud not be the key,
          // because it loses its connection to the represented data
          // Due to our components simplicity, it's fine here
          return (
            <CategoryWrapper key={index}>
              <ColorPreview color={category.color}></ColorPreview>
              <CategoryName>{category.title}</CategoryName>
            </CategoryWrapper>
          )
        }
      )}
    </Wrapper>
  )
}

export default EvaluationChartLegend
