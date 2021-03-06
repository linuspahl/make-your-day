// libraries
import React from 'react'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { GetEvaluationsForList } from 'store/evaluation/query'
import { DeleteEvaluation } from 'store/evaluation/mutation'
import { deleteEvaluation } from 'store/evaluation/update'
// interfaces
import { EvaluationForList } from 'store/evaluation/type'

interface Props {
  rootPath: string
}

const EvaluationOverview = ({ rootPath }: Props): JSX.Element => (
  <PageQueryHandler
    dataTestId="EvaluationOverview"
    errorMessages={{
      getEvaluations: 'Andere Sitzungen konnten nicht geladen werden',
    }}
    query={GetEvaluationsForList}
    queryNames={['getEvaluations']}
  >
    {({
      data: { getEvaluations: evaluations },
      status: { getEvaluations: evaluationsQueryStatus },
    }: {
      data: { getEvaluations: EvaluationForList[] }
      status?: { getEvaluations: JSX.Element }
    }): JSX.Element => {
      return (
        <>
          <H1 context="page">Auswertungen verwalten</H1>
          {evaluationsQueryStatus}
          {!evaluationsQueryStatus && evaluations && (
            <ul>
              {evaluations.map(
                (evaluation: EvaluationForList): JSX.Element => (
                  <EvaluationListItem
                    key={evaluation.id}
                    evaluation={evaluation}
                    rootPath={rootPath}
                  />
                )
              )}
            </ul>
          )}
          <ActionRow>
            <Button context="primary" to={`${rootPath}/create`}>
              Auswertung erstellen
            </Button>
          </ActionRow>
        </>
      )
    }}
  </PageQueryHandler>
)

interface EvaluationListItemProps {
  evaluation: EvaluationForList
  rootPath: string
}

const EvaluationListItem = ({
  evaluation: { id, title },
  rootPath,
}: EvaluationListItemProps): JSX.Element => (
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

export default EvaluationOverview
