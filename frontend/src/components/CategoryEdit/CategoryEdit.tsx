// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
import CategoryForm from 'components/CategoryForm/CategoryForm'
import H1 from 'shared/H1/H1'
// contexts
import AppContext from 'contexts/AppContext'
// graphql
import { UpdateCategory } from 'store/category/mutation'
import { GetCategory } from 'store/category/query'
// interfaces
import {
  CategoryEdit as CategoryEditType,
  Category,
  CategoryCreate,
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
): ((data: { updateCategory: Category }) => void) => {
  const { rootPath, history } = props
  return (data): void => {
    const {
      updateCategory: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Kategorie ${title} erfolgreich bearbeitet`,
    })

    // Go to the categories overview
    history.push(rootPath)
  }
}

// Form error function
const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}
const CategoryEdit = (props: Props): JSX.Element => {
  const { match, rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  const categoryId = extractIdFromUrl(match)
  return (
    <PageQueryHandler
      dataTestId="CategoryEdit"
      errorMessages={{ getCategory: 'Kategorie konnte nicht geladen werden' }}
      query={GetCategory}
      queryNames={['getCategory']}
      variables={{ id: categoryId }}
    >
      {({
        data: { getCategory: category },
        status: { getCategory: categoryQueryStatus },
      }: PageQueryResult): JSX.Element => {
        return (
          <React.Fragment>
            <H1 context="page">Kategorie bearbeiten</H1>
            {categoryQueryStatus}
            {!categoryQueryStatus && category && (
              <Mutation
                mutation={UpdateCategory}
                onCompleted={onCompleted}
                onError={onError}
              >
                {(
                  updateCategory: ({
                    variables,
                  }: {
                    variables: CategoryEditType
                  }) => void
                ): JSX.Element => (
                  <CategoryForm
                    initialData={{
                      type: category.type,
                      icon: category.icon,
                      color: category.color,
                      hasDescription: category.hasDescription,
                      hasSubcategories: category.hasSubcategories,
                      hasTitle: category.hasTitle,
                      hasUnit: category.hasUnit,
                      title: category.title,
                    }}
                    rootPath={rootPath}
                    submitAction={(variables: CategoryCreate): void =>
                      updateCategory({
                        variables: {
                          color: variables.color,
                          hasDescription: variables.hasDescription,
                          hasTitle: variables.hasTitle,
                          icon: variables.icon,
                          title: variables.title,
                          id: category.id,
                        },
                      })
                    }
                  />
                )}
              </Mutation>
            )}
          </React.Fragment>
        )
      }}
    </PageQueryHandler>
  )
}

export default withRouter(CategoryEdit)
