// libraries
import * as React from 'react'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
// utils
import { extractIdFromUrl } from 'utils/utils'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { GetCategoryForListWithChildren } from 'store/category/query'
import { Subcategory, CategoryFull } from 'store/category/type'
import { DeleteCategory } from 'store/category/mutation'
import { deleteSubcategory } from 'store/category/update'
import { DataProxy } from 'apollo-cache'
import { FetchResult } from 'apollo-link'

const List = styled.ul`
  margin-top: ${(props): string => `${props.theme.padding}rem`};
`

interface Props extends RouteComponentProps {
  rootPath: string
}

interface PageQueryResult {
  data: { getCategory: CategoryFull }
  status: { getCategory: JSX.Element }
}

class CategoryEdit extends React.Component<Props> {
  public render(): JSX.Element {
    const { rootPath, match } = this.props
    const categoryId = extractIdFromUrl(match)

    return (
      <PageQueryHandler
        dataTestId="SubcategoryOverview"
        errorMessages={{
          getCategory: 'Kategorie konnten nicht geladen werden',
        }}
        query={GetCategoryForListWithChildren}
        queryNames={['getCategory']}
        variables={{ id: categoryId }}
      >
        {({
          data: { getCategory: category },
          status: { getCategory: categoryQueryStatus },
        }: PageQueryResult): JSX.Element => {
          return (
            <React.Fragment>
              <H1 context="page">Subkategorien verwalten</H1>
              {categoryQueryStatus}
              {!categoryQueryStatus && category && category.subcategories && (
                <List>
                  {category.subcategories.map(
                    (subcategory: Subcategory): JSX.Element => (
                      <ListItem key={subcategory.id} spaceBetween>
                        {subcategory.title}
                        <ActionIconWrapper>
                          <ActionIcon
                            ariaLabel={`Subkategorie ${subcategory.title} bearbeiten`}
                            to={`${rootPath}/${categoryId}/subcategories/${subcategory.id}/edit`}
                            icon="edit"
                          />
                          <DeleteIcon
                            ariaLabel={`Subkategorie ${subcategory.title} löschen`}
                            id={subcategory.id}
                            mutation={DeleteCategory}
                            onUpdate={(
                              cache: DataProxy,
                              data: FetchResult
                            ): void =>
                              deleteSubcategory(
                                cache,
                                data,
                                { id: subcategory.id },
                                category.id
                              )
                            }
                            title={subcategory.title}
                          />
                        </ActionIconWrapper>
                      </ListItem>
                    )
                  )}
                </List>
              )}
              <ActionRow>
                <Button
                  context="primary"
                  to={`${rootPath}/${categoryId}/subcategories/create`}
                >
                  Subkategorie erstellen
                </Button>
              </ActionRow>
            </React.Fragment>
          )
        }}
      </PageQueryHandler>
    )
  }
}

export default withRouter(CategoryEdit)
