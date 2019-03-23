// libraries
import * as React from 'react'
import { Mutation, FetchResult } from 'react-apollo'
import { DataProxy } from 'apollo-cache';
import { DocumentNode } from 'graphql';
// components
import { Element } from './styles'
import Icon from 'shared/Icon/Icon'


interface Props {
  id: number,
  mutation: DocumentNode,
  onUpdate: (
    cache: DataProxy,
    data: FetchResult,
    variables: { id: number }
  ) => void,
  title: string
}

const handleClick = (action: () => void, title: string) => {
  if (confirm(`${title} wirklich löschen?`)) {
    action()
  }
}

const DeleteIcon = (props: Props) => {
  const { id, mutation, onUpdate, title } = props
  const variables = { id }

  return (
    <Mutation
      mutation={mutation}
      variables={variables}
      update={(cache, data) => onUpdate(cache, data, variables)}
    >
      {perfomMutation => (
        <Element onClick={() => handleClick(perfomMutation, title)}>
          <Icon title="trash" />
        </Element>
      )}
    </Mutation>
  )
}

export default DeleteIcon
