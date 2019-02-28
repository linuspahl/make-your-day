// libraries
import React from 'react'
import { Query } from 'react-apollo'
import { generateUrlParams } from 'utils/utils'
// styles
import { Layout, IconWrapper } from './styles'
// components
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetCategoriesIcon } from 'store/category/query.gql'

const CategoryIconOverview = props => (
  <Layout context={props.context}>
    <Query query={GetCategoriesIcon}>
      {({ loading, error, data }) => {
        if (loading) return <CenteredSpinner />
        if (error)
          return (
            <ErrorMessage
              error={error}
              message="Kategorien konnten nicht geladen werden"
            />
          )
        if (data.getCategories.length === 0) return <NoResult />
        return data.getCategories.map(category => {
          const urlParams = generateUrlParams(props.params)
          return (
            <IconWrapper key={category.id} context={props.context}>
              <CategoryIcon
                color={category.color}
                icon={category.icon}
                key={category.id}
                title={category.title}
                to={`/categories/${category.id}/records/create${urlParams}`}
              />
            </IconWrapper>
          )
        })
      }}
    </Query>
  </Layout>
)

export default CategoryIconOverview
