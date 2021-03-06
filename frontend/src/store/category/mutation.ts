// libraries
import gql from 'graphql-tag'

export const CreateCategory = gql`
  mutation CreateCategory(
    $color: String
    $hasDescription: Boolean
    $hasSubcategories: Boolean
    $hasTitle: Boolean
    $hasUnit: Boolean
    $icon: String
    $title: String!
    $type: String!
    $unit: String
  ) {
    createCategory(
      color: $color
      hasDescription: $hasDescription
      hasSubcategories: $hasSubcategories
      hasTitle: $hasTitle
      hasUnit: $hasUnit
      icon: $icon
      title: $title
      type: $type
      unit: $unit
    ) {
      color
      hasDescription
      hasSubcategories
      hasTitle
      hasUnit
      icon
      id
      title
      type
      unit
    }
  }
`

export const CreateSubcategory = gql`
  mutation CreateSubcategory($parentId: ID!, $title: String!, $color: String) {
    createSubcategory(parentId: $parentId, title: $title, color: $color) {
      id
      title
      parentId
      color
    }
  }
`

export const UpdateCategory = gql`
  mutation UpdateCategory(
    $color: String
    $hasDescription: Boolean
    $hasTitle: Boolean
    $icon: String
    $id: ID!
    $title: String!
    $unit: String
  ) {
    updateCategory(
      color: $color
      hasDescription: $hasDescription
      hasTitle: $hasTitle
      icon: $icon
      id: $id
      title: $title
      unit: $unit
    ) {
      color
      hasDescription
      hasTitle
      icon
      id
      title
      unit
    }
  }
`

export const UpdateSubcategory = gql`
  mutation UpdateSubcategory($id: ID!, $title: String!, $color: String) {
    updateCategory(id: $id, title: $title, color: $color) {
      color
      id
      parentId
      title
    }
  }
`

export const DeleteCategory = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`
