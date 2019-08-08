// libraries
import * as React from 'react'
import { Mutation, FetchResult } from 'react-apollo'
import { DataProxy } from 'apollo-cache'
import { DocumentNode } from 'graphql'
// components
import { Element } from './styles'
import Icon from 'shared/Icon/Icon'

interface Props {
  ariaLabel: string
  id: string
  mutation: DocumentNode
  onUpdate: (
    cache: DataProxy,
    data: FetchResult,
    variables: { id: string }
  ) => void
  title: string
}

const handleClick = (action: () => void, title: string): void => {
  if (confirm(`${title} wirklich löschen?`)) {
    action()
  }
}

const DeleteIcon = (props: Props): JSX.Element => {
  const { id, mutation, onUpdate, title } = props
  const variables = { id }

  return (
    <Mutation
      mutation={mutation}
      variables={variables}
      update={(cache: DataProxy, data: FetchResult): void => {
        onUpdate(cache, data, variables)
      }}
    >
      {(perfomMutation: () => void): JSX.Element => (
        <Element onClick={(): void => handleClick(perfomMutation, title)}>
          <Icon title="trash" />
        </Element>
      )}
    </Mutation>
  )
}

export default DeleteIcon
