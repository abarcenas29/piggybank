import React, { lazy, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Switch } from 'react-router-dom'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'
import { SET_ITEM_ACTION } from 'App/appReducer'

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
  const dispatch = useDispatch()

  useEffect(() => {
    const lsBudget = localStorage.getItem('budget')
    if (lsBudget) {
      dispatch(SET_ITEM_ACTION(JSON.parse(lsBudget)))
    }
  }, [])

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
