// libraries
import React from 'react'
// utils
import { handleInputChange } from 'utils/utils'
import { widgetTypeOptions, widgetPositionOptions } from 'params'
// components
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Button from 'shared/Button/Button'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
// interface
import { EvaluationForList } from 'store/evaluation/type'
import { WidgetCreate } from 'store/widget/type'
import { Form as FormType, SelectOption, InputEvent } from 'types/types'

interface Props {
  evaluations?: EvaluationForList[]
  initialData?: WidgetCreate
  mode?: FormType['mode']
  rootPath: string
  submitAction: (widget: WidgetCreate) => void
}

const generateEvaluationOptions = (
  evaluations: EvaluationForList[] = []
): SelectOption[] => {
  let evaluationOptions: SelectOption[] = []

  evaluations.forEach((evaluation): void => {
    evaluationOptions = [
      ...evaluationOptions,
      {
        value: evaluation.id,
        title: evaluation.title,
      },
    ]
  })

  return evaluationOptions
}

export default class WidgetForm extends React.Component<Props, WidgetCreate> {
  private handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  private handleInputChange: (event: InputEvent) => void

  public constructor(props: Props) {
    super(props)

    // overview of all form values
    // initial state create mode
    this.state = {
      title: null,
      type: 'textarea',
      position: 'dashboard-bottom',
    }

    if (props.initialData) {
      this.state = { ...this.state, ...props.initialData }
    }

    this.handleSubmit = (event): void => {
      event.preventDefault()
      this.props.submitAction(this.state)
    }

    this.handleInputChange = (event): void =>
      handleInputChange(event, this.setState.bind(this))
  }

  public render(): JSX.Element {
    const { mode, rootPath, evaluations } = this.props
    const { title, type, position, evaluationId } = this.state
    const evaluationOptions = generateEvaluationOptions(evaluations)
    const disabledFields = {
      type: mode !== 'create',
      evaluationId: type !== 'evaluation',
    }

    return (
      <form onSubmit={(event): void => this.handleSubmit(event)}>
        <Row htmlFor="title">
          <Input
            id="title"
            label="Name"
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
          />
        </Row>
        <Row disabled={disabledFields['type']} htmlFor="type">
          <ContentSelect
            disabled={disabledFields['type']}
            id="type"
            label="Art"
            name="type"
            onChange={this.handleInputChange}
            options={widgetTypeOptions}
            required
            tabIndex={1}
            value={type}
          />
        </Row>
        {type === 'evaluation' && (
          <Row disabled={disabledFields['evaluationId']} htmlFor="evaluationId">
            <ContentSelect
              disabled={disabledFields['evaluationId']}
              id="evaluationId"
              label="Auswertung"
              name="evaluationId"
              onChange={this.handleInputChange}
              options={evaluationOptions}
              required
              tabIndex={1}
              value={evaluationId}
            />
          </Row>
        )}
        <Row htmlFor="position">
          <ContentSelect
            id="position"
            label="Position"
            name="position"
            onChange={this.handleInputChange}
            options={widgetPositionOptions}
            required
            tabIndex={1}
            value={position}
          />
        </Row>
        <ActionRow>
          <Button context="secondary" tabIndex={1} to={rootPath}>
            Abbrechen
          </Button>
          <Button context="primary" tabIndex={1} type="submit">
            {mode === 'create' ? 'Erstellen' : 'Bearbeiten'}
          </Button>
        </ActionRow>
      </form>
    )
  }
}
