// libraries
import * as React from 'react'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Query } from 'react-apollo'
// utils
import { extractIdFromUrl } from 'utils/utils'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetCategoryPlainWithChildren } from 'store/category/query'
import { Subcategory, CategoryFull } from 'store/category/type'
import { ApolloError } from 'apollo-boost'

const List = styled.ul`
  margin-top: 25px;
`

interface Props extends RouteComponentProps {
  rootPath: string
}

class CategoryEdit extends React.Component<Props> {
  public render(): JSX.Element {
    const { rootPath, match } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <FadeTransition>
        <H1 context="page">Subkategorien verwalten</H1>

        <Query
          query={GetCategoryPlainWithChildren}
          variables={{ id: categoryId }}
        >
          {({
            loading,
            error,
            data,
          }: {
            loading: boolean
            error?: ApolloError
            data: { getCategory: CategoryFull }
          }): JSX.Element => {
            if (loading) return <CenteredSpinner />
            if (error)
              return (
                <ErrorMessage
                  error={error}
                  message="Kategorie konnten nicht geladen werden"
                />
              )
            if (
              !data.getCategory ||
              data.getCategory.subcategories.length === 0
            )
              return <NoResult />

            return (
              <List>
                {data.getCategory.subcategories.map(
                  (subcategory: Subcategory): JSX.Element => (
                    <ListItem key={subcategory.id} spaceBetween>
                      {subcategory.title}
                      <ActionIconWrapper>
                        <ActionIcon
                          ariaLabel={`Subkategorie ${subcategory.title} bearbeiten`}
                          to={`${rootPath}/${categoryId}/subcategories/${subcategory.id}/edit`}
                          icon="edit"
                        />
                      </ActionIconWrapper>
                    </ListItem>
                  )
                )}
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
