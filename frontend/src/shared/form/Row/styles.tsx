// libraries
import styled from 'styled-components'

interface LayoutProps {
  disabled?: boolean
  children: React.ReactNode
  onClick: () => void
  className: string
  htmlFor: string
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

  ${(props): string =>
    props.disabled &&
    `
      color: #b5b5b5;
      cursor: not-allowed;
    `};
`
