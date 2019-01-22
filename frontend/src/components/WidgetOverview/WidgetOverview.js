// libraries
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import H1 from 'shared/H1/H1'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ListItem from 'shared/list/ListItem/ListItem'
import EditIcon from 'shared/list/EditIcon/EditIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetWidgets } from 'store/widget/query.gql'

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
                  <EditIcon to={`${rootPath}/edit/${widget.id}`} />
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
