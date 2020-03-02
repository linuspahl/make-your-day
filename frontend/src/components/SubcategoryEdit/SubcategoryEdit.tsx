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

interface PageQueryResult {
  data: { getCategory: Category }
  status: { getCategory: JSX.Element }
}

const handleCompleted = (
  props: Props,
  createNotificationBanner: (notification: NotificationCreate) => void
): ((data: { updateCategory: Category }) => void) => {
  const { rootPath, history } = props
  return (data): void => {
    const {
      updateCategory: { parentId, title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Subkategorie ${title} erfolgreich bearbeitet`,
    })

    // Go to the subcategories overview
    history.push(`${rootPath}/${parentId}/subcategories`)
  }
}

const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Subkategorie fehlgeschlagen',
    })
    logError(error)
  }
}

const SubcategoryEdit = (props: Props): JSX.Element => {
  const { match, rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const categoryId = extractIdFromUrl(match)
  const parentCategoryId = extractIdFromUrl(match, 'categoryId')
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
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
              onCompleted={onCompleted}
              onError={onError}
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
