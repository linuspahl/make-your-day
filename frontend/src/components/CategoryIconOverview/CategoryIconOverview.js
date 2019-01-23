// libraries
import React from 'react'
import { Query } from 'react-apollo'
// styles
import { Layout, List } from './styles'
// components
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
// graphql
import { GetCategoriesIcon } from 'store/category/query.gql'

export default props => {
  const { inline } = props

  return (
    <Layout inline={inline}>
      <List inline={inline}>
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
            return data.getCategories.map(category => (
              <CategoryIcon
                color={category.color}
                icon={category.icon}
                key={category.id}
                title={category.title}
                to={`categories/${category.id}/records/create`}
              />
            ))
          }}
        </Query>
      </List>
    </Layout>
  )
}
