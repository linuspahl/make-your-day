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
  id: string
  mutation: DocumentNode
  onUpdate: (
    cache: DataProxy,
    data: FetchResult,
    variables: { id: string }
  ) => void
  onDelete: () => void
  title: string
}

const DeleteButton = (props: Props): JSX.Element => {
  const { id, mutation, onUpdate, title, onDelete } = props
  const variables = { id }

  return (
    <Mutation
      mutation={mutation}
      variables={variables}
      update={(cache: DataProxy, data: FetchResult): void =>
        onUpdate(cache, data, variables)
      }
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Button
          clickAction={(): void => handleClick(perfomMutation, onDelete, title)}
          context="delete"
        >
          Löschen
        </Button>
      )}
    </Mutation>
  )
}

export default DeleteButton
