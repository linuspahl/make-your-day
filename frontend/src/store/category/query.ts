// libraries
import gql from 'graphql-tag'


// fragments
export const CategoriesWithChildrenPure = gql`
  fragment CategoriesWithChildrenPure on Category {
    id
    title
    hasSubcategories
    subcategories {
      id
      title
    }
  }
`

// queries
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
  query GetCategory($id: ID!) {
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
  query GetCategoryWithChildren($id: ID!) {
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

export const CategoryWithChildrenFields = gql`
  fragment CategoryWithChildrenFields on Category {
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
`

export const GetCategoryPlainWithChildren = gql`
  query GetCategoryPlainWithChildren($id: ID!) {
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
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      title
      parentId
    }
  }
`
