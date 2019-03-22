// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1.tsx'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetEvaluations } from 'store/evaluation/query.gql'
import { DeleteEvaluation } from 'store/evaluation/mutation.gql'
import { deleteEvaluation } from 'store/evaluation/update'

const List = styled.div`
  margin-top: 25px;
`

const EvaluationOverview = props => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Auswertungen verwalten</H1>

      <Query query={GetEvaluations}>
        {({ loading, error, data }) => {
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
              {data.getEvaluations.map(evaluation => (
                <ListItem key={evaluation.id} spaceBetween>
                  {evaluation.title}
                  <div>
                    <ActionIcon
                      to={`${rootPath}/view/${evaluation.id}`}
                      icon="bar-chart"
                    />
                    <ActionIcon
                      to={`${rootPath}/edit/${evaluation.id}`}
                      icon="edit"
                    />
                    <DeleteIcon
                      id={evaluation.id}
                      mutation={DeleteEvaluation}
                      onUpdate={deleteEvaluation}
                      title={evaluation.title}
                    />
                  </div>
                </ListItem>
              ))}
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
