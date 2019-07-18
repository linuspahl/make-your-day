// libraries
import * as React from 'react'
import styled from 'styled-components'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
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

      <QueryStateHandler
        errorMessage="Andere Sitzungen konnten nicht geladen werden"
        query={GetEvaluations}
        queryName="getEvaluations"
      >
        {(evaluations: Evaluation[]): JSX.Element => {
          return (
            <List>
              {evaluations.map(
                (evaluation: Evaluation): JSX.Element => (
                  <EvaluationListItem
                    key={evaluation.id}
                    evaluation={evaluation}
                    rootPath={rootPath}
                  />
                )
              )}
            </List>
          )
        }}
      </QueryStateHandler>

      <ActionRow>
        <Button context="primary" to={`${rootPath}/create`}>
          Auswertung erstellen
        </Button>
      </ActionRow>
    </FadeTransition>
  )
}

const EvaluationListItem = (props: {
  evaluation: Evaluation
  rootPath: string
}): JSX.Element => {
  const {
    evaluation: { id, title },
    rootPath,
  } = props
  return (
    <ListItem spaceBetween>
      {title}
      <ActionIconWrapper>
        <ActionIcon
          ariaLabel={`Auswertung ${title} anzeigen`}
          to={`${rootPath}/view/${id}`}
          icon="bar-chart"
        />
        <ActionIcon
          ariaLabel={`Auswertung ${title} bearbeiten`}
          to={`${rootPath}/edit/${id}`}
          icon="edit"
        />
        <DeleteIcon
          ariaLabel={`Auswertung ${title} löschen`}
          id={id}
          mutation={DeleteEvaluation}
          onUpdate={deleteEvaluation}
          title={title}
        />
      </ActionIconWrapper>
    </ListItem>
  )
}

export default EvaluationOverview
