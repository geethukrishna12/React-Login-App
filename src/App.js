import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login';
import Home  from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css'


const App =()=>(
  <BrowserRouter>
  <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<ProtectedRoute />} >

      <Route path='/' element={<Home />} />
  </Route>
  <Route path='*' element={<Navigate to='/login' />}  />
  </Routes>
  </BrowserRouter>
  

  
)

export default App;
