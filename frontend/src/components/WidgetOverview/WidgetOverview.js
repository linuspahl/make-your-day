// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
// utils
import { widgetPositionOptions } from '../../../config/params'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import H2 from 'shared/H2/H2'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import H1 from 'shared/H1/H1'
import ListItem from 'shared/list/ListItem/ListItem'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetWidgets } from 'store/widget/query.gql'
import { DeleteWidget } from 'store/widget/mutation.gql'
import { deleteWidget } from 'store/widget/update'
import FadeTransition from 'shared/FadeTransition/FadeTransition'

const List = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`

const WidgetOverview = props => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Widgets verwalten</H1>

      <Query query={GetWidgets}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredSpinner />
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Widgets konnten nicht geladen werden"
              />
            )
          if (data.getWidgets.length === 0) return <NoResult />

          const widgetsByPosition = sortWidgetsByPosition(data.getWidgets)

          return Object.keys(widgetsByPosition).map(position => {
            const positionOption = widgetPositionOptions.find(
              option => option.value === position
            )
            return (
              <div key={position}>
                <H2>{positionOption.title}</H2>
                <List>
                  {widgetsByPosition[position].map(widget => (
                    <ListItem key={widget.id} spaceBetween draggable>
                      {widget.title}
                      <div>
                        <ActionIcon
                          to={`${rootPath}/edit/${widget.id}`}
                          icon="edit"
                        />
                        <DeleteIcon
                          id={widget.id}
                          mutation={DeleteWidget}
                          onUpdate={deleteWidget}
                          title={widget.title}
                        />
                      </div>
                    </ListItem>
                  ))}
                </List>
              </div>
            )
          })
        }}
      </Query>

      <ActionRow>
        <Button context="primary" to={`${rootPath}/create`}>
          Widget erstellen
        </Button>
      </ActionRow>
    </FadeTransition>
  )
}

const sortWidgetsByPosition = widgets => {
  // Expects common list of widgets
  // Returns an object which has all positions as keys and an array of the related widgets as value
  const positions = {}
  widgets.forEach(widget => {
    if (!positions[widget.position]) {
      positions[widget.position] = []
    }
    positions[widget.position] = [...positions[widget.position], widget]
  })
  return positions
}

export default WidgetOverview
