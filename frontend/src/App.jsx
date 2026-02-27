import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signin" element={<Sign/>} />
        <Route path="/home" element={<Home/>} />
        
      </Routes>
    </div>
  )
}

export default App

