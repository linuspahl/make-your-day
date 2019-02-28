// libraried
import React from 'react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'

// components
import Icon from 'shared/Icon/Icon'

const Wrapper = styled.div`
  height: 40px;
  width: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

  font-size: 26px;
  color: ${props => props.theme.text};
  &:active {
    background-color: ${props => props.theme.active};
  }
`

const handleClick = (action, title) => {
  if (confirm(`${title} wirklich löschen?`)) {
    action()
  }
}

const DeleteIcon = props => {
  const { id, mutation, onUpdate, title } = props
  const variables = { id }

  return (
    <Mutation
      mutation={mutation}
      variables={variables}
      update={(cache, data) => onUpdate(cache, data, variables)}
    >
      {perfomMutation => (
        <Wrapper onClick={() => handleClick(perfomMutation, title)}>
          <Icon title="trash" />
        </Wrapper>
      )}
    </Mutation>
  )
}

export default DeleteIcon
