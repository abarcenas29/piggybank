import React, {
  lazy
} from 'react'
import styled from 'styled-components'
import { Switch } from 'react-router-dom'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'

import Context from './context'
import MainNav from './components/MainNav'

const Container = styled.div`
  height: 100vh;
  
  > .content {
    overflow-y: auto;
  }
`

const LoadHome = lazy(() => import('Containers/Home' /* webpackChunkName: "Containers-Dashboard" */))

const LoadHistory = lazy(() => import('Containers/History' /* webpackChunkName: "Containers-History" */))

const LoadStats = lazy(() => import('Containers/Stats' /* webpackChunkName: "Containers-Stats" */))

const DashboardRoot = ({ routes, match, history }) => {
  const { isExact, path } = match
  return (
    <Context.Provider value={{ history }}>
      <Container className='l-d-f l-fd-col'>
        <MainNav />
        <div className='l-fg-1 content'>
          {
            isExact && path === '/' &&
              <LoadHome />
          }
          {
            isExact && path === '/history' &&
              <LoadHistory />
          }
          {
            isExact && path === '/stats' &&
              <LoadStats />
          }
          {
            !isExact &&
              <Switch>
                {
                  routes.map((r, i) => (
                    <RouteWithSubroutes {...r} key={i} />
                  ))
                }
              </Switch>
          }
        </div>
      </Container>
    </Context.Provider>
  )
}

export default DashboardRoot
