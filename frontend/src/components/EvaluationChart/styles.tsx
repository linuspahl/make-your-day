// libraries
import styled from 'styled-components'
// components
import TextSmall from 'shared/text/TextSmall/TextSmall'

interface WrapperProps {
  seriesColors: string[]
}

export const Wrapper = styled.div<WrapperProps>`
  text-align: center;

  .ct-label {
    fill: ${(props): string => props.theme.text};
  }

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

export const Description = styled(TextSmall)`
  margin-top: ${(props): string => `${props.theme.padding / 4}rem`};

  color: ${(props): string => props.theme.info};
`
