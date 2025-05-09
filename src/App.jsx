import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { routingPages } from './component/Routing/RoutingPages'
import Home from './component/Home/Home'
import AuthContext from './component/Context/AuthContext'
import EquipmentsContext from './component/Context/EquipmentsContext'
// import AppContext from './component/Context/AppContext'
let AppContext = React.lazy(() => import("./component/Context/AppContext"))

const App = () => {

  return (
    <div>
      <EquipmentsContext>
        <AuthContext>
          <AppContext>
            <RouterProvider router={routingPages}>
              <Suspense fallback="loading...">
                <Home />
              </Suspense>
            </RouterProvider>
          </AppContext>
        </AuthContext>
      </EquipmentsContext>
    </div>
  )
}

export default App
