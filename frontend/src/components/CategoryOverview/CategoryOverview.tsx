// libraries
import * as React from 'react'
import styled from 'styled-components'
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

interface PageQueryResult {
  data: { getCategories: CategoryPlain[] }
  status: { getCategories: JSX.Element }
}

const CategoryOverview = (props: Props): JSX.Element => {
  const { rootPath } = props

  return (
    <PageQueryHandler
      errorMessages={{
        getCategories: 'Kategorien konnten nicht geladen werden',
      }}
      query={GetCategories}
      queryNames={['getCategories']}
    >
      {({
        data: { getCategories: categories },
        status: { getCategories: categoriesQueryStatus },
      }: PageQueryResult): JSX.Element => {
        return (
          <React.Fragment>
            <H1 context="page">Kategorien verwalten</H1>
            {categoriesQueryStatus}
            {!categoriesQueryStatus && categories && (
              <List>
                {categories.map(
                  (category: CategoryPlain): JSX.Element => (
                    <CategoryListItem
                      category={category}
                      key={category.id}
                      rootPath={rootPath}
                    />
                  )
                )}
              </List>
            )}
            <ActionRow>
              <Button context="primary" to={`${rootPath}/create`}>
                Kategorie erstellen
              </Button>
            </ActionRow>
          </React.Fragment>
        )
      }}
    </PageQueryHandler>
  )
}

const CategoryListItem = (props: {
  category: CategoryPlain
  rootPath: string
}): JSX.Element => {
  const {
    category: { id, title, hasSubcategories },
    rootPath,
  } = props
  return (
    <ListItem spaceBetween>
      {title}
      <ActionIconWrapper>
        {hasSubcategories && (
          <ActionIcon
            to={`${rootPath}/${id}/subcategories`}
            icon="list-ul"
            ariaLabel={`Kategorie ${title} Subkategorien bearbeiten`}
          />
        )}
        <ActionIcon
          to={`${rootPath}/edit/${id}`}
          icon="edit"
          ariaLabel={`Kategorie ${title} bearbeiten`}
        />
        <DeleteIcon
          ariaLabel={`Kategorie ${title} löschen`}
          id={id}
          mutation={DeleteCategory}
          onUpdate={deleteCategory}
          title={title}
        />
      </ActionIconWrapper>
    </ListItem>
  )
}
export default CategoryOverview
