// libraries
import gql from 'graphql-tag'

// queries

// getCategories - for list + with children
export const GetCategories = gql`
  query {
    getCategories(parentsOnly: true) {
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

// getCategories - for list
export const GetCategoriesForList = gql`
  query {
    getCategories(parentsOnly: true) {
      id
      title
      hasSubcategories
    }
  }
`

// getCategories - for list + with children
export const GetCategoriesForListWithChildren = gql`
  query {
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

// getCategory
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

// getCategory - with children
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

// getCategory - for list + with children
export const GetCategoryForListWithChildren = gql`
  query GetCategoryForListWithChildren($id: ID!) {
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
      color
      id
      parentId
      title
    }
  }
`
