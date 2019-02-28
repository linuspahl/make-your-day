// libraries
import React from 'react'
import { Mutation } from 'react-apollo'

// components
import Button from 'shared/Button/Button'

const handleClick = (action, onDelete, title) => {
  if (confirm(`${title} wirklich löschen?`)) {
    action()
    onDelete()
  }
}

const DeleteButton = props => {
  const { id, mutation, onUpdate, title, onDelete } = props
  const variables = { id }

  return (
    <Mutation
      mutation={mutation}
      variables={variables}
      update={(cache, data) => onUpdate(cache, data, variables)}
    >
      {perfomMutation => (
        <Button
          clickAction={() => handleClick(perfomMutation, onDelete, title)}
          context="delete"
        >
          Löschen
        </Button>
      )}
    </Mutation>
  )
}

export default DeleteButton
