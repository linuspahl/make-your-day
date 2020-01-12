// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation, FetchResult } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
import { DataProxy } from 'apollo-cache'
// utils
import { extractIdFromUrl, logError, parseQueryParams } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { addSubcategory } from 'store/category/update'
import { CreateSubcategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import {
  SubcategoryCreate as SubcategoryCreateType,
  Category,
} from 'store/category/type'
import { NotificationCreate } from 'types/types'

interface Props extends RouteComponentProps {
  rootPath: string
}
interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
}

const handleCompleted = (
  props: Props,
  createNotificationBanner: (notification: NotificationCreate) => void
): ((data: { createSubcategory: Category }) => void) => {
  return (data): void => {
    const {
      history,
      location: { search },
      rootPath,
    } = props
    const queryParams: { source?: string } = parseQueryParams(search)
    const { source } = queryParams
    const {
      createSubcategory: { id, title, parentId },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Subkategorie ${title} erfolgreich erstellt`,
    })

    if (source === 'createRecord') {
      // Go to the subcategories overview
      history.push(`${rootPath}/${parentId}/records/create?subCategoryId=${id}`)
    } else {
      // By default Go to the subcategories overview
      history.push(`${rootPath}/${parentId}/subcategories`)
    }
  }
}

const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

const SubcategoryCreate = (props: Props): JSX.Element => {
  const { match, rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const categoryId = extractIdFromUrl(match)
  const parentCategoryId = extractIdFromUrl(match, 'categoryId')
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  return (
    <PageQueryHandler
      dataTestId="SubcategoryCreate"
      errorMessages={{
        getCategory: 'Kategorie konnten nicht geladen werden',
      }}
      query={GetCategory}
      queryNames={['getCategory']}
      variables={{ id: categoryId }}
    >
      {({
        data: { getCategory: parentCategory },
        status: { getCategory: getCategoryStatus },
      }: PageQueryResult): JSX.Element => (
        <React.Fragment>
          <H1 context="page">Subkategorie erstellen</H1>
          {getCategoryStatus}
          {!getCategoryStatus && parentCategory && (
            <Mutation
              mutation={CreateSubcategory}
              onCompleted={onCompleted}
              onError={onError}
              update={(cache: DataProxy, data: FetchResult): void =>
                addSubcategory(cache, data, { id: categoryId })
              }
            >
              {(
                createSubcategory: ({
                  variables,
                }: {
                  variables: SubcategoryCreateType
                }) => void
              ): JSX.Element => (
                <SubcategoryForm
                  mode="create"
                  rootPath={`${rootPath}/${parentCategoryId}/subcategories`}
                  submitAction={(variables: SubcategoryCreateType): void =>
                    createSubcategory({ variables })
                  }
                  parentCategoryId={parentCategory.id}
                />
              )}
            </Mutation>
          )}
        </React.Fragment>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(SubcategoryCreate)
