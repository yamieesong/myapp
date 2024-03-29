import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './css/admin/login.css'
import './css/admin/reset.css'
import './css/admin/layout.css'
import './css/admin/common.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import './css/admin/basic.css'
import store, { persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const appRoot = document.getElementById('root')
if (appRoot) {
  const queryClient = new QueryClient()
  console.log('queryClient!!!', queryClient)
  // const shadowRoot = appRoot.attachShadow({ mode: 'open' })
  const root = ReactDOM.createRoot(appRoot)

  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>,
        </PersistGate>
      </Provider>,
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>,
  )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
