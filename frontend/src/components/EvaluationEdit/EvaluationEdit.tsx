// libraries
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ApolloError, gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
// utils
import { extractIdFromUrl, logError } from 'utils/utils'
// components
import EvaluationForm from 'components/EvaluationForm/EvaluationForm'
import H1 from 'shared/H1/H1'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { UpdateEvaluation } from 'store/evaluation/mutation'
// interfaces
import { NotificationCreate } from 'types/types'
import { EvaluationEdit as EvaluationEditType } from 'store/evaluation/type'
import { CategoryForListWithChildren } from 'store/category/type'

export const pageQuery = gql`
  query($evaluationId: ID!) {
    getEvaluation(id: $evaluationId) {
      id
      title
      categoryId
      groupSubcategories
      type
      period
    }
    # same as GetCategoriesForListWithChildren query
    getCategories {
      id
      title
      hasSubcategories
      subcategories {
        id
        title
      }
    }
  }
`

interface Props extends RouteComponentProps {
  createNotificationBanner: (notification: NotificationCreate) => void
  rootPath: string
}

interface PageQueryResult {
  data: {
    getCategories: CategoryForListWithChildren[]
    getEvaluation: EvaluationEditType
  }
  status?: { getCategories: JSX.Element; getEvaluation: JSX.Element }
}

class EvaluationEdit extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)

    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  public render(): JSX.Element {
    const { match, rootPath } = this.props
    const evaluationId = extractIdFromUrl(match)

    return (
      <PageQueryHandler
        dataTestId="EvaluationEdit"
        query={pageQuery}
        variables={{ evaluationId }}
        queryNames={['getCategories', 'getEvaluation']}
        errorMessages={{
          getCategories: 'Kategorien konnten nicht geladen werden',
          getEvaluation: 'Auswertung konnten nicht geladen werden',
        }}
      >
        {({
          data: { getCategories: categories, getEvaluation: evaluation },
          status: { getEvaluation: evaluationQueryStatus },
        }: PageQueryResult): JSX.Element => (
          <React.Fragment>
            <H1 context="page">Auswertung bearbeiten</H1>
            {evaluationQueryStatus}
            {!evaluationQueryStatus && evaluation && (
              <Mutation
                mutation={UpdateEvaluation}
                onCompleted={this.handleCompleted}
                onError={this.handleError}
              >
                {(
                  updateEvaluation: ({
                    variables,
                  }: {
                    variables: EvaluationEditType
                  }) => void
                ): JSX.Element => (
                  <EvaluationForm
                    categories={categories}
                    initialData={evaluation}
                    rootPath={rootPath}
                    submitAction={(variables: EvaluationEditType): void => {
                      updateEvaluation({ variables })
                    }}
                  />
                )}
              </Mutation>
            )}
          </React.Fragment>
        )}
      </PageQueryHandler>
    )
  }

  // Form submit function
  private handleCompleted(data: {
    updateEvaluation: EvaluationEditType
  }): void {
    const { history, rootPath, createNotificationBanner } = this.props
    const {
      updateEvaluation: { title },
    } = data

    // Inform user about success
    createNotificationBanner({
      type: 'success',
      message: `Auswertung ${title} erfolgreich bearbeitet`,
    })

    // Go to the categories overview
    history.push(rootPath)
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung der Auswertung fehlgeschlagen',
    })
    logError(error)
  }
}

export default withRouter(EvaluationEdit)
