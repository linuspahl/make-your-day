// libraries
import * as React from 'react'
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
import { GetWidgetsOverview } from 'store/widget/query'
import { DeleteWidget } from 'store/widget/mutation'
import { deleteWidget } from 'store/widget/update'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
// interfaces
import { Widget } from 'store/widget/type'
import { ApolloError } from 'apollo-boost'

const List = styled.ul`
  margin-top: 10px;
  margin-bottom: 20px;
`

const sortWidgetsByPosition = (
  widgets: Widget[] = []
): {
  [key: string]: Widget[]
} => {
  // Expects common list of widgets
  // Returns an object which has all positions as keys and an array of the related widgets as value
  const positions: {
    [key: string]: Widget[]
  } = {}

  widgets.forEach(
    (widget): void => {
      if (!positions[widget.position]) {
        positions[widget.position] = []
      }
      positions[widget.position] = [...positions[widget.position], widget]
    }
  )

  return positions
}

interface Props {
  rootPath: string
}

const WidgetOverview = (props: Props): React.ReactElement => {
  const { rootPath } = props

  return (
    <FadeTransition fullWidth>
      <H1 context="page">Widgets verwalten</H1>

      <Query query={GetWidgetsOverview}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean
          error?: ApolloError
          data: { getWidgets: Widget[] }
        }): JSX.Element | JSX.Element[] => {
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

          return Object.keys(widgetsByPosition).map(
            (position): JSX.Element => {
              const positionOption = widgetPositionOptions.find(
                (option): boolean => option.value === position
              )
              return (
                <div key={position}>
                  <H2>{positionOption.title}</H2>
                  <List>
                    {widgetsByPosition[position].map(
                      (widget): JSX.Element => (
                        <ListItem key={widget.id} spaceBetween>
                          {widget.title}
                          <div>
                            <ActionIcon
                              ariaLabel={`Widget ${widget.title} bearbeiten`}
                              to={`${rootPath}/edit/${widget.id}`}
                              icon="edit"
                            />
                            <DeleteIcon
                              ariaLabel={`Widget ${widget.title} löschen`}
                              id={widget.id}
                              mutation={DeleteWidget}
                              onUpdate={deleteWidget}
                              title={widget.title}
                            />
                          </div>
                        </ListItem>
                      )
                    )}
                  </List>
                </div>
              )
            }
          )
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

export default WidgetOverview
