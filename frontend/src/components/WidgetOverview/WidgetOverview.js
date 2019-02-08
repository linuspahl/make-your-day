// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ContentBox from 'shared/ContentBox/ContentBox'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetWidgets } from 'store/widget/query.gql'
import { DeleteWidget } from 'store/widget/mutation.gql'
import { deleteWidget } from 'store/widget/update'
import FadeTransition from 'shared/FadeTransition/FadeTransition'

const List = styled.div`
  margin-top: 25px;
`

export default props => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
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
    </FadeTransition>
  )
}
