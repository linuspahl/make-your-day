// libraries
import React, { useContext } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// utils
import { logError } from 'utils/utils'
// components
import CategoryForm from 'components/CategoryForm/CategoryForm'
import ContentBox from 'shared/ContentBox/ContentBox'
import DefaultPageLayout from 'components/DefaultPageLayout/DefaultPageLayout'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
// interfaces
import { NotificationCreate } from 'types/types'
import {
  Category,
  CategoryCreate as CategoryCreateType,
} from 'store/category/type'
// graphql
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation'
import AppContext from 'contexts/AppContext'

interface Props extends RouteComponentProps {
  rootPath: string
}

const handleCompleted = (
  props: Props,
  createNotificationBanner: (notification: NotificationCreate) => void
): ((data: { createCategory: Category }) => void) => {
  const { rootPath, history } = props
  return (data): void => {
    const {
      createCategory: { id, title, hasSubcategories },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Kategorie ${title} erfolgreich erstellt`,
    })

    // Go to the categories overview
    if (hasSubcategories) {
      history.push(`${rootPath}/${id}/subcategories/create`)
    } else {
      history.push(rootPath)
    }
  }
}

const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Erstellung der Kategorie fehlgeschlagen',
    })
    logError(error)
  }
}

export const CategoryCreate = (props: Props): JSX.Element => {
  const { rootPath } = props
  const { createNotificationBanner } = useContext(AppContext)
  const onCompleted = handleCompleted(props, createNotificationBanner)
  const onError = handleError(createNotificationBanner)
  return (
    <FadeTransition fullWidth fullHeight>
      <DefaultPageLayout>
        <ContentBox role="main" context="page">
          <H1 context="page">Kategorie erstellen</H1>
          <Mutation
            mutation={CreateCategory}
            onCompleted={onCompleted}
            onError={onError}
            update={addCategory}
          >
            {(
              createCategory: ({
                variables,
              }: {
                variables: CategoryCreateType
              }) => void
            ): JSX.Element => (
              <CategoryForm
                mode="create"
                rootPath={rootPath}
                submitAction={(variables: CategoryCreateType): void =>
                  createCategory({ variables })
                }
              />
            )}
          </Mutation>
        </ContentBox>
      </DefaultPageLayout>
    </FadeTransition>
  )
}

export default withRouter(CategoryCreate)
