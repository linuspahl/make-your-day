// libraries
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { handleInputChange, logError } from 'utils/utils'
import { ApolloError } from 'apollo-boost'
import { init } from 'pell'
// graphql
import { UpdateWidget } from 'store/widget/mutation'
// components
import { PellEditor } from './styles'
// interfaces
import { Widget as WidgetType } from 'store/widget/type'
import { InputEvent, NotificationCreate } from 'types/types'

interface Props {
  createNotificationBanner: (notification: NotificationCreate) => void
  widget: WidgetType
}

export default class Widget extends React.Component<Props, WidgetType> {
  private editorRef: HTMLDivElement
  private editor: PellElement

  public constructor(props: Props) {
    super(props)

    this.state = props.widget

    this.handleError = this.handleError.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public componentDidMount(): void {
    this.editor = init({
      element: this.editorRef,
      onChange: (value: string): void => this.setState({ value }),
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'ulist',
        'code',
        'line',
        'link',
        'image',
      ],
    })
    this.editor.content.innerHTML = this.props.widget.value
  }

  public render(): JSX.Element {
    return (
      <Mutation mutation={UpdateWidget} onError={this.handleError}>
        {(
          updateWidget: ({ variables }: { variables: WidgetType }) => void
        ): JSX.Element => (
          <PellEditor
            data-testid="EditorWidget"
            ref={(elementRef): HTMLDivElement => (this.editorRef = elementRef)}
            onBlur={(): void => updateWidget({ variables: this.state })}
          />
        )}
      </Mutation>
    )
  }

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.setState.bind(this))
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
