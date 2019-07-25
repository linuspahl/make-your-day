// libraries
import * as React from 'react'
import styled from 'styled-components'
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

const List = styled.ul`
  margin-top: 25px;
`

interface Props {
  rootPath: string
}

const EvaluationOverview = (props: Props): JSX.Element => {
  const { rootPath } = props

  return (
    <PageQueryHandler
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
          <React.Fragment>
            <H1 context="page">Auswertungen verwalten</H1>
            {evaluationsQueryStatus}
            {!evaluationsQueryStatus && evaluations && (
              <List>
                {evaluations.map(
                  (evaluation: EvaluationForList): JSX.Element => (
                    <EvaluationListItem
                      key={evaluation.id}
                      evaluation={evaluation}
                      rootPath={rootPath}
                    />
                  )
                )}
              </List>
            )}
            <ActionRow>
              <Button context="primary" to={`${rootPath}/create`}>
                Auswertung erstellen
              </Button>
            </ActionRow>
          </React.Fragment>
        )
      }}
    </PageQueryHandler>
  )
}

const EvaluationListItem = (props: {
  evaluation: EvaluationForList
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
