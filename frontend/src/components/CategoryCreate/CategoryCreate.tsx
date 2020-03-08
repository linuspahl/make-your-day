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
// contexts
import AppContext from 'contexts/AppContext'
// interfaces
import { NotificationCreate } from 'types/types'
import {
  Category,
  CategoryCreate as CategoryCreateType,
} from 'store/category/type'
// graphql
import { addCategory } from 'store/category/update'
import { CreateCategory } from 'store/category/mutation'

interface Props extends RouteComponentProps {
  rootPath: string
}

interface SubmitResult {
  createCategory: Category
}

const onSubmitComplete = (
  rootPath: Props['rootPath'],
  history: Props['history'],
  data: SubmitResult,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
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

const onSubmitError = (
  error: ApolloError,
  createNotificationBanner: (notification: NotificationCreate) => void
): void => {
  createNotificationBanner({
    type: 'error',
    message: 'Erstellung der Kategorie fehlgeschlagen',
  })
  logError(error)
}

export const CategoryCreate = ({ rootPath, history }: Props): JSX.Element => {
  const { createNotificationBanner } = useContext(AppContext)
  const handleSubmitComplete = (submitResult: SubmitResult): void =>
    onSubmitComplete(rootPath, history, submitResult, createNotificationBanner)
  const handleSubmitError = (error: ApolloError): void =>
    onSubmitError(error, createNotificationBanner)
  return (
    <FadeTransition fullWidth fullHeight>
      <DefaultPageLayout>
        <ContentBox role="main" context="page">
          <H1 context="page">Kategorie erstellen</H1>
          <Mutation
            mutation={CreateCategory}
            onCompleted={handleSubmitComplete}
            onError={handleSubmitError}
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
