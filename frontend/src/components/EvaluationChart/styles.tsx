// libraries
import styled from 'styled-components'

interface WrapperProps {
  seriesColors: string[]
}

export const Wrapper = styled.div<WrapperProps>`
  text-align: center;

  ${(props): string => {
    let result = props.seriesColors.map(
      (color): string => `
        .Chart-series-${color} {
          fill: ${props.theme.category[color]};
        }`
    )
    return result.join()
  }}
`

export const Description = styled.div`
  margin-top: 5px;
`
