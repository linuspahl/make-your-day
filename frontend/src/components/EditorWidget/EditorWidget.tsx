// libraries
import React, { useState, useContext } from 'react'
import { Mutation } from 'react-apollo'
import { logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
// components
import Editor from 'components/Editor/Editor'
import Modal from 'shared/Modal/Modal'
// contexts
import AppContext from 'contexts/AppContext'
// interfaces
import { Widget, WidgetEdit } from 'store/widget/type'
import { NotificationCreate } from 'types/types'
// graphql
import { UpdateWidget } from 'store/widget/mutation'

interface Props {
  widget: Widget
}

interface State {
  value: Widget['value']
  isEditorFullScreen: boolean
}

// Form error function
const handleError = (
  createNotificationBanner: (notification: NotificationCreate) => void
): ((error: ApolloError) => void) => {
  return (error): void => {
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}

const EditorWidget = (props: Props): JSX.Element => {
  const { widget } = props
  const [isFullScreen, setIsFullSreen] = useState(false)
  const [value, setValue] = useState(widget.value)
  const { createNotificationBanner } = useContext(AppContext)
  const onError = handleError(createNotificationBanner)

  const toggleModal = (): void => {
    setIsFullSreen(!isFullScreen)
  }

  const renderEditor = (
    widget: Widget,
    value: Widget['value'],
    updateWidget: ({ variables }: { variables: WidgetEdit }) => void,
    fullScreenType?: boolean,
    onClick?: () => void
  ): JSX.Element => {
    return (
      <Editor
        fullScreenType={fullScreenType}
        key={`${widget.id}-${fullScreenType ? 'fullscreen' : 'preview'}`}
        onClick={onClick}
        onChange={setValue}
        onBlur={(): void =>
          updateWidget({
            variables: {
              id: widget.id,
              value,
            },
          })
        }
        value={value}
      />
    )
  }

  return (
    <Mutation mutation={UpdateWidget} onError={onError}>
      {(
        updateWidget: ({ variables }: { variables: WidgetEdit }) => void
      ): JSX.Element => (
        <>
          {renderEditor(widget, value, updateWidget, false, toggleModal)}
          {isFullScreen && (
            <Modal headline={widget.title} toggleAction={toggleModal}>
              {renderEditor(widget, value, updateWidget, true)}
            </Modal>
          )}
        </>
      )}
    </Mutation>
  )
}

export default EditorWidget
