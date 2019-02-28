// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetCategories } from 'store/category/query.gql'
import { DeleteCategory } from 'store/category/mutation.gql'
import { deleteCategory } from 'store/category/update'

const List = styled.div`
  margin-top: 25px;
`

const CategoryOverview = props => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
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
                  <div>
                    {category.hasSubcategories && (
                      <ActionIcon
                        to={`${rootPath}/${category.id}/subcategories`}
                        icon="list-ul"
                      />
                    )}
                    <ActionIcon
                      to={`${rootPath}/edit/${category.id}`}
                      icon="edit"
                    />
                    <DeleteIcon
                      id={category.id}
                      mutation={DeleteCategory}
                      onUpdate={deleteCategory}
                      title={category.title}
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
          Kategorie erstellen
        </Button>
      </ActionRow>
    </FadeTransition>
  )
}

export default CategoryOverview
