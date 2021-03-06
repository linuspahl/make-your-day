// libraries
import * as React from 'react'
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
import { GetCategoriesForList } from 'store/category/query'
import { DeleteCategory } from 'store/category/mutation'
import { deleteCategory } from 'store/category/update'
// interfaces
import { CategoryForList } from 'store/category/type'

interface Props {
  rootPath: string
}

interface PageQueryResult {
  data: { getCategories: CategoryForList[] }
  status: { getCategories: JSX.Element }
}

const CategoryOverview = ({ rootPath }: Props): JSX.Element => (
  <PageQueryHandler
    dataTestId="CategoryOverview"
    errorMessages={{
      getCategories: 'Kategorien konnten nicht geladen werden',
    }}
    query={GetCategoriesForList}
    queryNames={['getCategories']}
  >
    {({
      data: { getCategories: categories },
      status: { getCategories: categoriesQueryStatus },
    }: PageQueryResult): JSX.Element => {
      return (
        <>
          <H1 context="page">Kategorien verwalten</H1>
          {categoriesQueryStatus}
          {!categoriesQueryStatus && categories && (
            <ul>
              {categories.map(
                (category: CategoryForList): JSX.Element => (
                  <CategoryListItem
                    category={category}
                    key={category.id}
                    rootPath={rootPath}
                  />
                )
              )}
            </ul>
          )}
          <ActionRow>
            <Button context="primary" to={`${rootPath}/create`}>
              Kategorie erstellen
            </Button>
          </ActionRow>
        </>
      )
    }}
  </PageQueryHandler>
)

interface CategoryListItemProps {
  category: CategoryForList
  rootPath: string
}

const CategoryListItem = ({
  category: { id, title, hasSubcategories },
  rootPath,
}: CategoryListItemProps): JSX.Element => (
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

export default CategoryOverview
