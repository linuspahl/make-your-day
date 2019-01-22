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
import { GetCategories } from 'store/category/query.gql'

const List = styled.div`
  margin-top: 25px;
`

export default props => {
  const { rootPath } = props

  return (
    <Fragment>
      <H1 context="page">Kategorien verwalten</H1>

      <Query query={GetCategories}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredSpinner />
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Kategorien konnten nicht geladen werden"
              />
            )
          if (data.getCategories.length === 0) return <NoResult />
          return (
            <List>
              {data.getCategories.map(category => (
                <ListItem key={category.id} spaceBetween>
                  {category.title}
                  <EditIcon to={`${rootPath}/edit/${category.id}`} />
                </ListItem>
              ))}
            </List>
          )
        }}
      </Query>

      <ActionRow>
        <Button context="primary" to={`${rootPath}/create`}>
          Kategorie erstellen
        </Button>
      </ActionRow>
    </Fragment>
  )
}
