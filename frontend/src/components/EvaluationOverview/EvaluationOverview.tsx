// libraries
import * as React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-boost'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetEvaluations } from 'store/evaluation/query'
import { DeleteEvaluation } from 'store/evaluation/mutation'
import { deleteEvaluation } from 'store/evaluation/update'
// interfaces
import { Evaluation } from 'store/evaluation/type'

const List = styled.ul`
  margin-top: 25px;
`

interface Props {
  rootPath: string
}

const EvaluationOverview = (props: Props): JSX.Element => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Auswertungen verwalten</H1>

      <Query query={GetEvaluations}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean
          error?: ApolloError
          data: { getEvaluations: Evaluation[] }
        }): JSX.Element => {
          if (loading) return <CenteredSpinner />
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Auswertungen konnten nicht geladen werden"
              />
            )
          if (data.getEvaluations.length === 0) return <NoResult />
          return (
            <List>
              {data.getEvaluations.map(
                (evaluation: Evaluation): JSX.Element => (
                  <ListItem key={evaluation.id} spaceBetween>
                    {evaluation.title}
                    <div>
                      <ActionIcon
                        ariaLabel={`Auswertung ${evaluation.title} anzeigen`}
                        to={`${rootPath}/view/${evaluation.id}`}
                        icon="bar-chart"
                      />
                      <ActionIcon
                        ariaLabel={`Auswertung ${evaluation.title} bearbeiten`}
                        to={`${rootPath}/edit/${evaluation.id}`}
                        icon="edit"
                      />
                      <DeleteIcon
                        ariaLabel={`Auswertung ${evaluation.title} löschen`}
                        id={evaluation.id}
                        mutation={DeleteEvaluation}
                        onUpdate={deleteEvaluation}
                        title={evaluation.title}
                      />
                    </div>
                  </ListItem>
                )
              )}
            </List>
          )
        }}
      </Query>

      <ActionRow>
        <Button context="primary" to={`${rootPath}/create`}>
          Auswertung erstellen
        </Button>
      </ActionRow>
    </FadeTransition>
  )
}

export default EvaluationOverview
