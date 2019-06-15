// libraries
import * as React from 'react'
import styled from 'styled-components'
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
import { EvaluationPlain } from 'store/evaluation/type'
import { WidgetCreate } from 'store/widget/type'
import { Form as FormType, SelectOption, InputEvent } from 'types/types'

const Form = styled.form`
  margin-top: 15px;
`

interface Props {
  evaluations?: EvaluationPlain[]
  initialData?: WidgetCreate
  mode?: FormType['mode']
  rootPath: string
  submitAction: (widget: WidgetCreate) => void
}

const generateEvaluationOptions = (
  evaluations: EvaluationPlain[] = []
): SelectOption[] => {
  let evaluationOptions: SelectOption[] = []

  evaluations.forEach(
    (evaluation): void => {
      evaluationOptions = [
        ...evaluationOptions,
        {
          value: evaluation.id,
          title: evaluation.title,
        },
      ]
    }
  )

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
      disabledFields: type !== 'textarea',
    }

    return (
      <Form onSubmit={(event): void => this.handleSubmit(event)}>
        <Row htmlFor="title">
          Name
          <Input
            id="title"
            name="title"
            onChange={this.handleInputChange}
            required
            tabIndex={1}
            value={title}
          />
        </Row>
        <Row disabled={disabledFields['type']} htmlFor="type">
          Art
          <ContentSelect
            disabled={disabledFields['type']}
            id="type"
            name="type"
            onChange={this.handleInputChange}
            options={widgetTypeOptions}
            tabIndex={1}
            title="Art"
            value={type}
          />
        </Row>
        <Row disabled={disabledFields['evaluationId']} htmlFor="evaluationId">
          Verknüpfte Auswertung
          <ContentSelect
            disabled={disabledFields['evaluationId']}
            id="evaluationId"
            name="evaluationId"
            onChange={this.handleInputChange}
            options={evaluationOptions}
            tabIndex={1}
            title="Auswertung"
            value={evaluationId}
          />
        </Row>
        <Row htmlFor="position">
          Position
          <ContentSelect
            id="position"
            name="position"
            onChange={this.handleInputChange}
            options={widgetPositionOptions}
            tabIndex={1}
            title="Position"
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
      </Form>
    )
  }
}
