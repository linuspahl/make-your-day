// libraries
import React from 'react'
import { Mutation } from 'react-apollo'
import { logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
// components
import Editor from 'components/Editor/Editor'
import Modal from 'shared/Modal/Modal'
// interfaces
import { Widget, WidgetEdit } from 'store/widget/type'
import { NotificationCreate } from 'types/types'
// graphql
import { UpdateWidget } from 'store/widget/mutation'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  widget: Widget
}

interface State {
  value: Widget['value']
  isEditorFullScreen: boolean
}

class EditorWidget extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props)

    this.state = {
      value: props.widget.value,
      isEditorFullScreen: false,
    }

    this.handleError = this.handleError.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  public render(): JSX.Element {
    const { widget } = this.props
    const { isEditorFullScreen, value } = this.state

    return (
      <Mutation mutation={UpdateWidget} onError={this.handleError}>
        {(
          updateWidget: ({ variables }: { variables: WidgetEdit }) => void
        ): JSX.Element => (
          <React.Fragment>
            {this.renderEditor(
              widget,
              value,
              updateWidget,
              false,
              this.toggleModal
            )}
            {isEditorFullScreen && (
              <Modal
                headline={widget.title}
                toggleAction={(): void => this.toggleModal()}
              >
                {this.renderEditor(widget, value, updateWidget, true)}
              </Modal>
            )}
          </React.Fragment>
        )}
      </Mutation>
    )
  }

  private renderEditor = (
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
        onChange={(value: string): void => this.setState({ value })}
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

  private toggleModal(): void {
    const { isEditorFullScreen } = this.state
    this.setState({ isEditorFullScreen: !isEditorFullScreen })
  }

  // Form error function
  private handleError(error: ApolloError): void {
    const { createNotificationBanner } = this.props
    createNotificationBanner({
      type: 'error',
      message: 'Bearbeitung des Widgets fehlgeschlagen',
    })
    logError(error)
  }
}

export default EditorWidget
