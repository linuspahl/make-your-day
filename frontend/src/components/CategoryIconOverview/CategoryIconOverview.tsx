// libraries
import React, { useRef } from 'react'
import { Query } from 'react-apollo'
import { generateUrlParams } from 'utils/utils'
import { Link } from 'react-router-dom'
import { fill } from 'lodash'
import { ApolloError } from 'apollo-boost'
// styles
import { Layout, IconWrapper, NoResultWrapper } from './styles'
// components
import CategoryIcon from 'shared/CategoryIcon/CategoryIcon'
import CategoryIconPlaceholder from 'shared/CategoryIcon/CategoryIconPlaceholder'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import PlaceholderGroup from 'shared/PlaceholderGroup/PlaceholderGroup'
// graphql
import { GetCategories } from 'store/category/query'
// interfaces
import { Category, CategoryForList } from 'store/category/type'
import { useEffect } from 'react'

interface LoadingPlaceholderProps {
  context?: 'horizontal-scroll'
}

const LoadingPlaceholder = (props: LoadingPlaceholderProps): JSX.Element => (
  <PlaceholderGroup verticalCenter>
    {fill(Array(3), null).map(
      (value, key): JSX.Element => (
        <IconWrapper key={key} context={props.context}>
          <CategoryIconPlaceholder />
        </IconWrapper>
      )
    )}
  </PlaceholderGroup>
)

interface Props {
  context?: 'horizontal-scroll'
  params?: { [key: string]: string }
}

const CategoryIconOverview = (props: Props): JSX.Element => {
  const { context, params } = props
  const wrapperRef = useRef<HTMLInputElement | null>(null)
  const scrollOverview = (event: WheelEvent): void => {
    if (event.deltaY > 0) wrapperRef.current.scrollLeft += 25
    else wrapperRef.current.scrollLeft -= 25
  }

  useEffect((): (() => void) => {
    if (props.context === 'horizontal-scroll') {
      wrapperRef.current.addEventListener('wheel', scrollOverview)
    }
    return (): void => {
      if (props.context === 'horizontal-scroll') {
        wrapperRef.current.removeEventListener('wheel', scrollOverview)
      }
    }
  }, [])

  return (
    <Layout context={context} ref={wrapperRef}>
      <Query query={GetCategories}>
        {({
          loading,
          error,
          data,
        }: {
          loading: boolean
          error?: ApolloError
          data: { getCategories: CategoryForList[] }
        }): JSX.Element | JSX.Element[] => {
          if (loading) {
            return <LoadingPlaceholder context={context} />
          }

          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Kategorien konnten nicht geladen werden"
              />
            )

          if (!data.getCategories || data.getCategories.length === 0)
            return (
              <NoResultWrapper>
                <Link to="/categories/create">
                  <NoResult message="Noch keine Kategorie vorhanden" />
                </Link>
              </NoResultWrapper>
            )

          const urlParams = generateUrlParams(params)
          return data.getCategories.map(
            (category: Category): JSX.Element => (
              <IconWrapper key={category.id} context={context}>
                <CategoryIcon
                  ariaLabel={`Erstelle Eintrag für Kategorie ${category.title}`}
                  color={category.color}
                  icon={category.icon}
                  key={category.id}
                  title={category.title}
                  to={`/categories/${category.id}/records/create${urlParams}`}
                />
              </IconWrapper>
            )
          )
        }}
      </Query>
    </Layout>
  )
}

export default CategoryIconOverview
