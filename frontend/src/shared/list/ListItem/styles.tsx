// libraries
import styled from 'styled-components'

interface ListItemProps {
  spaceBetween?: boolean
  clickable: boolean
  children: React.ReactNode
}

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.spaceBetween ? 'space-between' : 'start')};

  min-height: 40px;

  border-top: 1px solid ${props => props.theme.border};
  padding: 0 10px;
  &:first-child {
    border-top: 0;
  }

  ${props =>
    props.clickable
      ? `
    &:active {
      background-color: ${props.theme.active};
    }
  `
      : ``}
`
