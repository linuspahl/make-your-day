// libraries
import gql from 'graphql-tag'

// Alias for CreateUserSession
export const GetCategories = gql`
  query GetCategories {
    getCategories(parentsOnly: true) {
      id
      title
      hasSubcategories
    }
  }
`

export const GetCategoriesWithChildren = gql`
  query GetCategoriesWithChildren {
    getCategories(parentsOnly: true) {
      id
      title
      hasSubcategories
      subcategories {
        id
        title
      }
    }
  }
`

export const GetCategoriesIcon = gql`
  query GetCategoriesIcon {
    getCategories(parentsOnly: true) {
      color
      icon
      id
      title
      type
    }
  }
`
export const GetCategory = gql`
  query GetCategory($id: Int!) {
    getCategory(id: $id) {
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

export const GetCategoryWithChildren = gql`
  query GetCategoryWithChildren($id: Int!) {
    getCategory(id: $id) {
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
      subcategories {
        id
        title
      }
    }
  }
`

export const GetCategoryPlainWithChildren = gql`
  query GetCategoryPlainWithChildren($id: Int!) {
    getCategory(id: $id) {
      hasSubcategories
      id
      title
      subcategories {
        id
        title
      }
    }
  }
`

export const GetSubcategory = gql`
  query GetCategory($id: Int!) {
    getCategory(id: $id) {
      id
      title
      parentId
    }
  }
`
