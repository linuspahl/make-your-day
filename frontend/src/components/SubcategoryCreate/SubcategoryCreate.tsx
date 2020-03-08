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

interface SubmitResult {
  createSubcategory: Category
}

const onSubmitCompleted = (
  { createSubcategory: { id, title, parentId } }: SubmitResult,
  rootPath: Props['rootPath'],
  history: Props['history'],
  { search }: Props['location'],
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  const queryParams: { source?: string } = parseQueryParams(search)
  const { source } = queryParams

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

const onSubmitError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  createNotificationBanner({
    type: 'error',
    message: 'Erstellung der Subkategorie fehlgeschlagen',
  })
  logError(error)
}

const SubcategoryCreate = ({
  history,
  location,
  match,
  rootPath,
}: Props): JSX.Element => {
  const { createNotificationBanner } = useContext(AppContext)

  const categoryId = extractIdFromUrl(match)
  const parentCategoryId = extractIdFromUrl(match, 'categoryId')

  const onCompleted = (data: SubmitResult): void =>
    onSubmitCompleted(
      data,
      rootPath,
      history,
      location,
      createNotificationBanner
    )
  const onError = (error: ApolloError): void =>
    onSubmitError(error, createNotificationBanner)

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
        <>
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
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(SubcategoryCreate)
