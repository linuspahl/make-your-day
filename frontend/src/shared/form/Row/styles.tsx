// libraries
import styled from 'styled-components'

interface LayoutProps {
  disabled?: boolean
  htmlFor?: string
  onClick: () => {}
}

export const Layout = styled.div<LayoutProps>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-flow: wrap;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.disabled &&
    `
      color: #b5b5b5;
       cursor: not-allowed;
    `
  };
`