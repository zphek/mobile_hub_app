import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import Protect from './pages/Protect';
import Logs from './pages/Logs';
import Token from './pages/Tokens';
import Page404 from './pages/404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Register}/>
        <Route path='/products' element={<Protect><Products/></Protect>}/>
        <Route path='/logs' element={<Protect><Logs/></Protect>}/>
        <Route path='/tokens' element={<Protect><Token/></Protect>}/>
        <Route path='/products/edit/:id' Component={Login}/>
        <Route path='/settings' Component={Login}/>
        <Route path='/*' Component={Page404}/>
      </Routes>
    </Router>
  )
}

export default App
