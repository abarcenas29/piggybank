import { lazy } from 'react'

const LoadDashboard = lazy(() => import('RootContainers/Dashboard' /* webpackChunkName: "Container-Dashboard" */))

const routes = [
  {
    path: '/',
    component: LoadDashboard,
    exact: true
  },
  {
    path: '/history',
    component: LoadDashboard,
    exact: true
  },
  {
    path: '/stats',
    component: LoadDashboard,
    exact: true
  }
]

export default routes
