// libraries
import * as React from 'react'
// utils
import { handleInputChange } from 'utils/utils'
// components
import { Form, CategoryIconWrapper, Category } from './styles'
import Row from 'shared/form/Row/Row'
import ActionRow from 'shared/form/ActionRow/ActionRow'
import Input from 'shared/form/Input/Input'
import Button from 'shared/Button/Button'
import Textarea from 'shared/form/Textarea/Textarea'
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import ContentSelect from 'shared/form/ContentSelect/ContentSelect'
// interfaces
import { CategoryFull } from 'store/category/type'
import { Form as FormType, InputEvent, SelectOption } from 'types/types'
import { RecordCreate } from 'store/record/type'

interface Props {
  category: CategoryFull
  initialData?: RecordCreate
  params?: { createdAt?: string }
  mode?: FormType['mode']
  rootPath: string
  submitAction: (record: RecordCreate) => void
}

export default class RecordForm extends React.Component<Props, RecordCreate> {
  public constructor(props: Props) {
    super(props)

    let initialCategoryId: number = props.category.id
    if (
      props.category.hasSubcategories &&
      props.category.subcategories.length >= 1
    ) {
      initialCategoryId = props.category.subcategories[0].id
    }

    // overview of all form values
    // initial state create mode
    this.state = {
      amount: null,
      categoryId: initialCategoryId,
      createdAt: null,
      description: null,
      title: null,
    }

    if (props.initialData) {
      this.state = { ...this.state, ...props.initialData, ...props.params }
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public componentDidMount(): void {
    const {
      category: { type },
      submitAction,
      mode,
    } = this.props
    // If the category is type counter, we want to submit the form directly
    // This is possible, because the categoryId is alredy defined and the only required attribute
    if (mode === 'create' && type === 'counter') {
      submitAction(this.state)
    }
  }

  public render(): React.ReactElement {
    const {
      mode,
      rootPath,
      category: {
        color,
        hasDescription,
        hasTitle,
        hasUnit,
        icon,
        unit,
        title: categoryTitle,
        hasSubcategories,
        subcategories,
        id: parentCatId,
      },
    } = this.props
    const { categoryId, title, amount, description } = this.state
    const subcategoryOptions = this.prepareSubcategories(subcategories)

    // If a category is defined with 'hasSubcategories'
    // but the user did not created subcategories yet
    // we'll show an info instead of the form
    if (hasSubcategories && subcategoryOptions.length === 0) {
      return (
        <React.Fragment>
          <Row>
            Für die Kategorie {categoryTitle} muss mindestens eine
            Unterkategorie angelegt werden.
          </Row>
          <ActionRow>
            <Button
              context="primary"
              to={`/categories/${parentCatId}/subcategories/create`}
            >
              Untekategorie anlegen
            </Button>
          </ActionRow>
        </React.Fragment>
      )
    }

    return (
      <Form onSubmit={event => this.handleSubmit(event)}>
        <Category>
          <CategoryIconWrapper>
            <CategoryIcon icon={icon} color={color} title={categoryTitle} />
          </CategoryIconWrapper>
          {categoryTitle}
        </Category>
        {hasTitle && (
          <Row>
            Titel
            <Input
              name="title"
              onChange={this.handleInputChange}
              required
              tabIndex={1}
              value={title}
            />
          </Row>
        )}
        {hasSubcategories && (
          <Row>
            <React.Fragment>
              Unterkategorie
              <ContentSelect
                name="categoryId"
                onChange={this.handleInputChange}
                options={subcategoryOptions}
                tabIndex={1}
                title="Unterkategorie"
                value={categoryId}
              />
            </React.Fragment>
          </Row>
        )}
        {hasDescription && (
          <Row>
            Beschreibung
            <Textarea
              name="description"
              onChange={this.handleInputChange}
              value={description}
              required
            />
          </Row>
        )}
        {hasUnit && (
          <Row>
            Anzahl ({unit})
            <Input
              tabIndex={1}
              name="amount"
              onChange={this.handleInputChange}
              type="number"
              value={amount}
              required
            />
          </Row>
        )}
        <ActionRow>
          <Button context="secondary" to={rootPath}>
            Abbrechen
          </Button>
          <Button context="primary" type="submit">
            {mode === 'create' ? 'Erstellen' : 'Bearbeiten'}
          </Button>
        </ActionRow>
      </Form>
    )
  }

  private handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    this.props.submitAction(this.state)
  }

  private handleInputChange(event: InputEvent): void {
    handleInputChange(event, this.setState.bind(this))
  }

  private prepareSubcategories(subcategories?: CategoryFull[]): SelectOption[] {
    return subcategories.map(subcategory => {
      return { value: subcategory.id, title: subcategory.title }
    })
  }
}
