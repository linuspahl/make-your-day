// libraries
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import H1 from 'shared/H1/H1'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ListItem from 'shared/list/ListItem/ListItem'
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
// graphql
import { GetWidgets } from 'store/widget/query.gql'
import { DeleteWidget } from 'store/widget/mutation.gql'
import { deleteWidget } from 'store/widget/update'

const List = styled.div`
  margin-top: 25px;
`

export default props => {
  const { rootPath } = props

  return (
    <Fragment>
      <H1 context="page">Widgets verwalten</H1>

      <Query query={GetWidgets}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredSpinner />
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Widgets konnten nicht geladen werden"
              />
            )
          if (data.getWidgets.length === 0) return <NoResult />
          return (
            <List>
              {data.getWidgets.map(widget => (
                <ListItem key={widget.id} spaceBetween>
                  {widget.title}
                  <div>
                    <ActionIcon
                      to={`${rootPath}/edit/${widget.id}`}
                      icon="edit"
                    />
                    <DeleteIcon
                      id={widget.id}
                      mutation={DeleteWidget}
                      onUpdate={deleteWidget}
                      title={widget.title}
                    />
                  </div>
                </ListItem>
              ))}
            </List>
          )
        }}
      </Query>

      <ActionRow>
        <Button context="primary" to={`${rootPath}/create`}>
          Widget erstellen
        </Button>
      </ActionRow>
    </Fragment>
  )
}
