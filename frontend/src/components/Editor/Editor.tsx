// libraries
import * as React from 'react'
import { init } from 'pell'
// components
import { PellEditor } from './styles'

interface Props {
  onClick?: () => void
  onBlur: () => void
  onChange: (value: string) => void
  onFocus?: (event: FocusEvent) => void
  value: string
  fullScreenType?: boolean
}

const visibleActions = [
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
]

export default class EditorWidget extends React.Component<Props> {
  private editorRef: HTMLDivElement
  private editor: PellElement

  public componentDidMount(): void {
    const { onChange } = this.props
    this.editor = init({
      element: this.editorRef,
      onChange: onChange,
      actions: visibleActions,
    })
    this.editor.content.innerHTML = this.props.value

    // When the editor is fullscreen, we want to focus it after it did mount
    if (this.props.fullScreenType) {
      const editor = this.editorRef.getElementsByClassName('pell-content')
      // The check, if getSelection is a function, is a workaraound,
      // because we can't mock this function properly jet.
      if (editor && editor[0] && typeof document.getSelection == 'function') {
        let p = editor[0],
          s = window.getSelection(),
          r = document.createRange()

        r.setStart(p, 0)
        r.setEnd(p, 0)
        s.removeAllRanges()
        s.addRange(r)
      }
    }
  }

  public componentWillReceiveProps(nextProps: Props): void {
    // The following part is required to update the preview,
    // when the user is doing changes in the fullcreen view
    if (!this.props.fullScreenType && this.props.value !== nextProps.value) {
      this.editor.content.innerHTML = nextProps.value
    }
  }

  public render(): JSX.Element {
    const { onBlur, onClick } = this.props
    const hasOnClick = typeof onClick == 'function'

    return (
      <PellEditor
        data-testid="EditorWidget"
        ref={(elementRef: HTMLDivElement): void => {
          this.editorRef = elementRef
        }}
        onClick={hasOnClick ? (): void => onClick() : null}
        onBlur={onBlur}
      />
    )
  }
}
