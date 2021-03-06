import 'sanitize.css'
import 'semantic-ui-css/semantic.min.css'
import '@abarcenas/atomic-styles/css/global.css'
import 'react-toastify/dist/ReactToastify.css'

import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import RouteWithSubroutes from 'Components/RouteWithSubRoutes'

import { ToastContainer } from 'react-toastify'
import Store from './store'
import routes from './routes'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

const env = process.env.NODE_ENV

const App = () => {
  return (
    <Provider store={Store}>
      <Router>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            {
              routes.map(
                (route, i) =>
                  <RouteWithSubroutes key={i} {...route} />
              )
            }
          </Switch>
          <ToastContainer />
        </Suspense>
      </Router>
    </Provider>
  )
}

const $app = document.getElementById('app')
if (env === 'development') {
  console.log(`Console Environment is ${env}`)

  const HotApp = hot(module)(App)
  ReactDOM.render(<HotApp />, $app)
} else {
  ReactDOM.render(<App />, $app)
}

// Enable Service Worker
if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('sw.js')
    .then(registration => console.log(registration))
    .catch(console.error)
}
