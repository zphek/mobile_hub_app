import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Login}/>
        <Route path='/products' Component={Login}/>
        <Route path='/products/edit/:id' Component={Login}/>
        <Route path='/settings' Component={Login}/>
      </Routes>
    </Router>
  )
}

export default App
