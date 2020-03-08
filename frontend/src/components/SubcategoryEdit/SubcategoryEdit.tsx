// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import H1 from 'shared/H1/H1'
import SubcategoryForm from 'components/SubcategoryForm/SubcategoryForm'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { UpdateSubcategory } from 'store/category/mutation'
import { GetSubcategory } from 'store/category/query'
// interface
import { NotificationCreate } from 'types/types'
import {
  Category,
  Subcategory,
  SubcategoryEdit as SubcategoryEditType,
} from 'store/category/type'

interface Props extends RouteComponentProps {
  rootPath: string
}

interface SubmitResult {
  updateCategory: Category
}

interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
}

const onSubmitCompleted = (
  { updateCategory: { parentId, title } }: SubmitResult,
  rootPath: Props['rootPath'],
  history: Props['history'],
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  // Inform user about success
  createNotificationBanner({
    type: 'success',
    message: `Subkategorie ${title} erfolgreich bearbeitet`,
  })

  // Go to the subcategories overview
  history.push(`${rootPath}/${parentId}/subcategories`)
}

const onSubmitError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  createNotificationBanner({
    type: 'error',
    message: 'Bearbeitung der Subkategorie fehlgeschlagen',
  })
  logError(error)
}

const SubcategoryEdit = ({ match, rootPath, history }: Props): JSX.Element => {
  const { createNotificationBanner } = useContext(AppContext)
  const categoryId = extractIdFromUrl(match)
  const parentCategoryId = extractIdFromUrl(match, 'categoryId')
  const handleSubmitCompleted = (data: SubmitResult): void =>
    onSubmitCompleted(data, rootPath, history, createNotificationBanner)
  const handleSubmitError = (error: ApolloError): void =>
    onSubmitError(error, createNotificationBanner)

  return (
    <PageQueryHandler
      dataTestId="SubcategoryEdit"
      errorMessages={{
        getCategory: 'Subkategorie konnte nicht geladen werden',
      }}
      query={GetSubcategory}
      queryNames={['getCategory']}
      variables={{ id: categoryId }}
    >
      {({
        data: { getCategory: subcategory },
        status: { getCategory: getCategoryStatus },
      }: PageQueryResult): JSX.Element => (
        <>
          <H1 context="page">Subkategorie bearbeiten</H1>
          {getCategoryStatus}
          {!getCategoryStatus && subcategory && (
            <Mutation
              mutation={UpdateSubcategory}
              onCompleted={handleSubmitCompleted}
              onError={handleSubmitError}
            >
              {(
                updateCategory: ({
                  variables,
                }: {
                  variables: Subcategory
                }) => void
              ): JSX.Element => (
                <SubcategoryForm
                  initialData={{
                    title: subcategory.title,
                    color: subcategory.color,
                  }}
                  rootPath={`${rootPath}/${parentCategoryId}/subcategories`}
                  parentCategoryId={subcategory.parentId}
                  submitAction={(variables: SubcategoryEditType): void => {
                    updateCategory({
                      variables: {
                        id: subcategory.id,
                        title: variables.title,
                        color: variables.color,
                      },
                    })
                  }}
                />
              )}
            </Mutation>
          )}
        </>
      )}
    </PageQueryHandler>
  )
}

export default withRouter(SubcategoryEdit)
