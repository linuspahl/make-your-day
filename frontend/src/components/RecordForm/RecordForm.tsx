// libraries
import * as React from 'react'
import { Link } from 'react-router-dom'
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
import { CategoryFull, Subcategory } from 'store/category/type'
import { Form as FormType, InputEvent, SelectOption } from 'types/types'
import { RecordCreate, RecordEdit } from 'store/record/type'

interface Props {
  category: CategoryFull
  initialData?: RecordCreate
  params?: {
    createdAt?: RecordCreate['createdAt']
    subcategoryId: RecordCreate['categoryId']
  }
  mode?: FormType['mode']
  rootPath: string
  submitAction: (record: RecordCreate | RecordEdit) => void
}

export default class RecordForm extends React.Component<Props, RecordCreate> {
  public constructor(props: Props) {
    const {
      category,
      mode,
      params = { subcategoryId: null, createdAt: null },
      initialData,
    } = props
    super(props)

    let initialCategoryId: string =
      mode === 'create'
        ? params.subcategoryId || category.id
        : initialData && initialData.categoryId
        ? initialData.categoryId
        : null

    // initial form values
    this.state = {
      amount: null,
      categoryId: initialCategoryId,
      createdAt: mode === 'create' ? params.createdAt || null : null,
      description: null,
      title: null,
    }

    // create
    // categoryID Param
    // categoryId can be overwritten by subcategoryid
    //

    // overwrite initial values, with form props.
    // The initial data represents the full entry, used for the edit mode.
    // The params prop represents the url query params.
    // Beacuse of this usage the initialData has more priority than the query params.
    if (props.initialData || props.params) {
      this.state = { ...this.state, ...props.initialData }
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

  public render(): JSX.Element {
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
      <Form onSubmit={(event): void => this.handleSubmit(event)}>
        <Category>
          <CategoryIconWrapper>
            <CategoryIcon icon={icon} color={color} title={categoryTitle} />
          </CategoryIconWrapper>
          {categoryTitle}
        </Category>
        {hasTitle && (
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
        )}
        {hasSubcategories && (
          <Row htmlFor="categoryId">
            <React.Fragment>
              <ContentSelect
                id="categoryId"
                label="Unterkategorie"
                name="categoryId"
                onChange={this.handleInputChange}
                options={subcategoryOptions}
                tabIndex={1}
                value={categoryId}
                required
                renderFooter={(): JSX.Element => (
                  <Link
                    to={`/categories/${parentCatId}/subcategories/create?source=createRecord`}
                  >
                    Weitere Unterkategorie anlegen
                  </Link>
                )}
              />
            </React.Fragment>
          </Row>
        )}
        {hasDescription && (
          <Row htmlFor="description">
            Beschreibung
            <Textarea
              id="description"
              name="description"
              onChange={this.handleInputChange}
              value={description}
              required
            />
          </Row>
        )}
        {hasUnit && (
          <Row htmlFor="amount">
            {`Anzahl (${unit})`}
            <Input
              id="amount"
              name="amount"
              onChange={this.handleInputChange}
              required
              step="0.01"
              tabIndex={1}
              type="number"
              value={amount}
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

  private prepareSubcategories(
    subcategories: Subcategory[] = []
  ): SelectOption[] {
    return subcategories.map(
      (subcategory): SelectOption => {
        return { value: subcategory.id, title: subcategory.title }
      }
    )
  }
}
