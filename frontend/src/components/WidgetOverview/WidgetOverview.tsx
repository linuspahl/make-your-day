// libraries
import React from 'react'
// utils
import { widgetPositionOptions } from 'params'
// components
import ActionIcon from 'shared/list/ActionIcon/ActionIcon'
import ActionIconWrapper from 'shared/list/ActionIconWrapper/ActionIconWrapper'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Button from 'shared/Button/Button'
import DeleteIcon from 'shared/list/DeleteIcon/DeleteIcon'
import H1 from 'shared/H1/H1'
import H2 from 'shared/H2/H2'
import Spacer from 'shared/Spacer/Spacer'
import ListItem from 'shared/list/ListItem/ListItem'
import PageQueryHandler from 'shared/PageQueryHandler/PageQueryHandler'
// graphql
import { GetWidgetsForList } from 'store/widget/query'
import { DeleteWidget } from 'store/widget/mutation'
import { deleteWidget } from 'store/widget/update'
// interfaces
import { WidgetForList } from 'store/widget/type'

const sortWidgetsByPosition = (
  widgets: WidgetForList[] = []
): {
  [key: string]: WidgetForList[]
} => {
  // Expects common list of WidgetForLists
  // Returns an object which has all positions as keys and an array of the related widgets as value
  const positions: {
    [key: string]: WidgetForList[]
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

interface PageQueryResult {
  data?: { getWidgets: WidgetForList[] }
  status?: { getWidgets: JSX.Element }
}

const WidgetOverview = ({ rootPath }: Props): JSX.Element => (
  <PageQueryHandler
    dataTestId="WidgetOverview"
    errorMessages={{ getWidgets: 'Widgets konnten nicht geladen werden' }}
    query={GetWidgetsForList}
    queryNames={['getWidgets']}
  >
    {({
      data: { getWidgets: widgets },
      status: { getWidgets: widgetsQueryStatus },
    }: PageQueryResult): JSX.Element => {
      const widgetsByPosition = sortWidgetsByPosition(widgets)
      return (
        <>
          <H1 context="page">Widgets verwalten</H1>
          {widgetsQueryStatus}
          {!widgetsQueryStatus &&
            widgets &&
            Object.keys(widgetsByPosition).map(
              (position, index): JSX.Element => {
                const positionOption = widgetPositionOptions.find(
                  (option): boolean => option.value === position
                )
                return (
                  <div key={position}>
                    <H2>{positionOption.title}</H2>
                    <ul>
                      {widgetsByPosition[position].map(
                        (widget): JSX.Element => (
                          <WidgetListItem
                            key={widget.id}
                            rootPath={rootPath}
                            widget={widget}
                          />
                        )
                      )}
                    </ul>
                    {index < Object.keys(widgetsByPosition).length && (
                      <Spacer />
                    )}
                  </div>
                )
              }
            )}
          <ActionRow>
            <Button context="primary" to={`${rootPath}/create`}>
              Widget erstellen
            </Button>
          </ActionRow>
        </>
      )
    }}
  </PageQueryHandler>
)

interface WidgetListItemProps {
  widget: WidgetForList
  rootPath: string
}

const WidgetListItem = ({
  widget: { title, id },
  rootPath,
}: WidgetListItemProps): JSX.Element => (
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

export default WidgetOverview
