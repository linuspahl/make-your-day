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
  border-radius: 0.25rem;

  box-shadow: 0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.12);

  will-change: transform, opacity;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);

  user-select: none;

  ${(props): string => {
    let bgColor = `#fff`
    let activeBgColor = `#efefef`
    let color = props.theme.text
    if (props.context === 'primary') {
      activeBgColor = props.theme.primaryActive
      bgColor = props.theme.primary
      color = '#fff'
    }
    if (props.context === 'secondary') {
      bgColor = props.theme.secondary
      activeBgColor = props.theme.secondaryActive
    }
    if (props.context === 'delete') {
      activeBgColor = props.theme.deleteActive
      bgColor = props.theme.delete
      color = '#fff'
    }

    return `
      height: 2.5rem;

      display: flex;
      align-items: center;

      padding: 0 ${props.theme.padding}rem;
      border: 0;
      
      color: ${color};

      background-color: ${bgColor};
      
      cursor: pointer;

      &:visited, &:focus {
        color: ${color};
      }
      &:active, &:focus {
        background-color: ${activeBgColor};
      };
      &:hover {
        box-shadow: 0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.2), 0 0.25rem 0.3125rem 0 rgba(0, 0, 0, 0.14), 0 0.0625rem 0.625rem 0 rgba(0, 0, 0, 0.12);
      }
      &:active {
        box-shadow: 0 0.3125rem 0.3125rem -0.1875rem rgba(0, 0, 0, 0.2), 0 0.5rem 0.625rem 0.0625rem rgba(0, 0, 0, 0.14), 0 0.1875rem 0.875rem 0.125rem rgba(0, 0, 0, 0.12);
      }
    `
  }};
`
