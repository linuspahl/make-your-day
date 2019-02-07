// libraries
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { sortBy } from 'utils/utils'
// components
import CenteredSpinner from 'shared/CenteredSpinner/CenteredSpinner'
import ErrorMessage from 'shared/ErrorMessage/ErrorMessage'
import NoResult from 'shared/NoResult/NoResult'
import Widget from 'components/Widget/Widget'
import ContentBox from 'shared/ContentBox/ContentBox'
// graphql
import { GetWidgets } from 'store/widget/query.gql'

const Layout = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 20px 20px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    padding: 20px 20px 20px 0;
    white-space: normal;
    overflow-y: scroll;
  }
`

const WidgetLayout = styled.div`
  display: inline-block;

  width: 100%;
  height: 100%;

  margin-right: 20px;

  @media (min-width: ${props =>
      props.theme.mediaQuery.tablet}) and (orientation: landscape) {
    margin-right: 0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default props => {
  const { createNotificationBanner } = props

  return (
    <Layout>
      <Query query={GetWidgets}>
        {({ loading, error, data }) => {
          if (loading) return <CenteredSpinner />
          if (error)
            return (
              <ErrorMessage
                error={error}
                message="Widgets konnten nicht geladen werden"
              />
            )
          if (data.getWidgets.length === 0)
            return (
              <ContentBox>
                <NoResult />
              </ContentBox>
            )
          return sortBy(data.getWidgets, 'id').map(widget => (
            <WidgetLayout key={widget.id}>
              <Widget
                createNotificationBanner={createNotificationBanner}
                widget={widget}
              />
            </WidgetLayout>
          ))
        }}
      </Query>
    </Layout>
  )
}
