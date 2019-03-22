// libraries
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
// utils
import { extractIdFromUrl } from 'utils/utils'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetCategoryPlainWithChildren } from 'store/category/query.gql'

const List = styled.div`
  margin-top: 25px;
`

class CategoryEdit extends React.Component {
  render() {
    const { rootPath, match } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <FadeTransition>
        <H1 context="page">Subkategorien verwalten</H1>

        <Query
          query={GetCategoryPlainWithChildren}
          variables={{ id: categoryId }}
        >
          {({ loading, error, data }) => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorie konnten nicht geladen werden"
                />
              )
            if (
              !data.getCategory === 0 ||
              data.getCategory.subcategories.length === 0
            )
              return <NoResult />

            return (
              <List>
                {data.getCategory.subcategories.map(subcategory => (
                  <ListItem key={subcategory.id} spaceBetween>
                    {subcategory.title}
                    <ActionIcon
                      to={`${rootPath}/${categoryId}/subcategories/${
                        subcategory.id
                      }/edit`}
                      icon="edit"
                    />
                  </ListItem>
                ))}
              </List>
            )
          }}
        </Query>

        <ActionRow>
          <Button
            context="primary"
            to={`${rootPath}/${categoryId}/subcategories/create`}
          >
            Subkategorie erstellen
          </Button>
        </ActionRow>
      </FadeTransition>
    )
  }
}

export default withRouter(CategoryEdit)
