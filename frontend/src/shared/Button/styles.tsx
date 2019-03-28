// libraries
import styled from 'styled-components'
//interfaces
interface LayoutProps {
  type: string
  to: string
  onClick: () => void
  context: string
}

export const Layout = styled.button<LayoutProps>`
  user-select: none;

  ${props => {
    let bgColor = `#fff`
    let activeBgColor = `#efefef`
    if (props.context === 'primary') {
      bgColor = props.theme.primary
      activeBgColor = props.theme.primaryActive
    }
    if (props.context === 'secondary') {
      bgColor = props.theme.secondary
      activeBgColor = props.theme.secondaryActive
    }
    if (props.context === 'delete') {
      bgColor = props.theme.delete
      activeBgColor = props.theme.deleteActive
    }

    return `
      display: flex;
      align-items: center;

      height: 40px;
      padding: 0 20px;
      border: 0;

      background-color: ${bgColor};
      color: ${props.theme.text};
      cursor: pointer;

      &:active, &:focus {
        background-color: ${activeBgColor};
      };
    `
  }}
`
