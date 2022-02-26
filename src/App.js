import React, {Suspense} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const fallBackUI = () => {
  return(
    <>
      <h1>Loading...</h1>
    </>
  )
}


const Bank = React.lazy(() => import('./Components/Bank'))


const App = () => {
  return(
    <>
      <Router>
        <Suspense fallback={fallBackUI()}>
          <Routes>
            <Route path='/' element={<Bank />} />
            <Route path='*' element={<Bank />} />
          </Routes>

        </Suspense>
      </Router>

    </>
  )
}

export default App