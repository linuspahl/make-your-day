// libraries
import * as React from 'react'
import { Query } from 'react-apollo'
import { generateUrlParams } from 'utils/utils'
// styles
import { Layout, IconWrapper } from './styles'
// components
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import CategoryIconPlaceholder from 'shared/CategoryIcon/CategoryIconPlaceholder'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
// graphql
import { GetCategoriesIcon } from 'store/category/query'
// interfaces
import { Category } from 'store/category/type';

interface LoadingPlaceholderProps {
  context?: 'horizontal-scroll'
}

const LoadingPlaceholder = (props: LoadingPlaceholderProps) => (
  <PlaceholderGroup>
    {[...Array(6)].map((value, key) => (
      <IconWrapper key={key} context={props.context}>
        <CategoryIconPlaceholder />
      </IconWrapper>
    ))}
  </PlaceholderGroup>
)

interface Props {
  context?: 'horizontal-scroll'
  params?: any
}

const CategoryIconOverview = (props: Props) => (
  <Layout context={props.context}>
    <Query query={GetCategoriesIcon}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingPlaceholder context={props.context} />

        if (error)
          return (
            <ErrorMessage
              error={error}
              message="Kategorien konnten nicht geladen werden"
            />
          )

        if (data.getCategories.length === 0) return <NoResult />

        const urlParams = generateUrlParams(props.params)
        return data.getCategories.map((category: Category) => {
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
