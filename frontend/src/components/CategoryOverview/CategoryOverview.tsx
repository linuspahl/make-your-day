// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
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
import { GetCategories } from 'store/category/query'
import { DeleteCategory } from 'store/category/mutation'
import { deleteCategory } from 'store/category/update'
// interfaces
import { CategoryPlain } from 'store/category/type'

const List = styled.ul`
  margin-top: 25px;
`

interface Props {
  rootPath: string
}

const CategoryOverview = (props: Props): JSX.Element => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Kategorien verwalten</H1>

      <Query query={GetCategories}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean
          data: { getCategories: CategoryPlain[] }
          error?: ApolloError
        }): JSX.Element[] | JSX.Element => {
          if (loading) return <CenteredSpinner />
          if (error) {
            return (
              <ErrorMessage
                error={error}
                message="Kategorien konnten nicht geladen werden"
              />
            )
          }
          if (data.getCategories.length === 0) return <NoResult />
          return (
            <List>
              {data.getCategories.map(
                (category: CategoryPlain): JSX.Element => (
                  <ListItem key={category.id} spaceBetween>
                    {category.title}
                    <div>
                      {category.hasSubcategories && (
                        <ActionIcon
                          to={`${rootPath}/${category.id}/subcategories`}
                          icon="list-ul"
                          ariaLabel={`Kategorie ${
                            category.title
                          } Subkategorien bearbeiten`}
                        />
                      )}
                      <ActionIcon
                        to={`${rootPath}/edit/${category.id}`}
                        icon="edit"
                        ariaLabel={`Kategorie ${category.title} bearbeiten`}
                      />
                      <DeleteIcon
                        ariaLabel={`Kategorie ${category.title} löschen`}
                        id={category.id}
                        mutation={DeleteCategory}
                        onUpdate={deleteCategory}
                        title={category.title}
                      />
                    </div>
                  </ListItem>
                )
              )}
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
