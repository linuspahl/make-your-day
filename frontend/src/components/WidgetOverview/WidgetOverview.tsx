// libraries
import * as React from 'react'
import styled from 'styled-components'
// utils
import { widgetPositionOptions } from 'params'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import ContentBox from 'shared/ContentBox/ContentBox'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import H1 from 'shared/H1/H1'
import H2 from 'shared/H2/H2'
import ListItem from 'shared/list/ListItem/ListItem'
import QueryStateHandler from 'shared/QueryStateHandler/QueryStateHandler'
// graphql
import { GetWidgetsOverview } from 'store/widget/query'
import { DeleteWidget } from 'store/widget/mutation'
import { deleteWidget } from 'store/widget/update'
import FadeTransition from 'shared/FadeTransition/FadeTransition'
// interfaces
import { Widget } from 'store/widget/type'

const List = styled.ul`
  margin-top: 10px;
  margin-bottom: 20px;
`

const sortWidgetsByPosition = (
  widgets: Widget[]
): {
  [key: string]: Widget[]
} => {
  // Expects common list of widgets
  // Returns an object which has all positions as keys and an array of the related widgets as value
  const positions: {
    [key: string]: Widget[]
  } = {}

  widgets.forEach((widget): void => {
    if (!positions[widget.position]) {
      positions[widget.position] = []
    }
    positions[widget.position] = [...positions[widget.position], widget]
  })

  return positions
}

interface Props {
  rootPath: string
}

const WidgetOverview = (props: Props): JSX.Element => {
  const { rootPath } = props

  return (
    <QueryStateHandler
      errorMessage="Widgets konnten nicht geladen werden"
      query={GetWidgetsOverview}
      queryName="getWidgets"
    >
      {(widgets: Widget[]): JSX.Element => {
        const widgetsByPosition = sortWidgetsByPosition(widgets)
        return (
          <FadeTransition fullWidth>
            <ContentBox role="main">
              <H1 context="page">Widgets verwalten</H1>
              {Object.keys(widgetsByPosition).map(
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
                            <WidgetListItem
                              key={widget.id}
                              rootPath={rootPath}
                              widget={widget}
                            />
                          )
                        )}
                      </List>
                    </div>
                  )
                }
              )}
              <ActionRow>
                <Button context="primary" to={`${rootPath}/create`}>
                  Widget erstellen
                </Button>
              </ActionRow>
            </ContentBox>
          </FadeTransition>
        )
      }}
    </QueryStateHandler>
  )
}

const WidgetListItem = (props: {
  widget: Widget
  rootPath: string
}): JSX.Element => {
  const {
    widget: { title, id },
    rootPath,
  } = props
  return (
    <ListItem spaceBetween>
      {title}
      <ActionIconWrapper>
        <ActionIcon
          ariaLabel={`Widget ${title} bearbeiten`}
          to={`${rootPath}/edit/${id}`}
          icon="edit"
        />
        <DeleteIcon
          ariaLabel={`Widget ${title} löschen`}
          id={id}
          mutation={DeleteWidget}
          onUpdate={deleteWidget}
          title={title}
        />
      </ActionIconWrapper>
    </ListItem>
  )
}
export default WidgetOverview
