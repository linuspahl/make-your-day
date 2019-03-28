// libraries
import * as React from 'react'
import { Mutation, FetchResult } from 'react-apollo'
import { DataProxy } from 'apollo-cache'
import { DocumentNode } from 'graphql'
// components
import Button from 'shared/Button/Button'

const handleClick = (
  action: () => void,
  onDelete: () => void,
  title: string
): void => {
  if (confirm(`${title} wirklich löschen?`)) {
    action()
    onDelete()
  }
}

interface Props {
  id: number
  mutation: DocumentNode
  onUpdate: (
    cache: DataProxy,
    data: FetchResult,
    variables: { id: number }
  ) => void
  onDelete: () => void
  title: string
}

const DeleteButton = (props: Props): React.ReactElement => {
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
