import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddFaculty from '../pages/admin/AddFaculty';
import ManageFaculty from '../pages/admin/ManageFaculty';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signin" element={<Sign/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-add-faculty" element={<AddFaculty/>} />
        <Route path="/admin-manage-faculty" element={<ManageFaculty/>} />
        
      </Routes>
    </div>
  )
}

export default App

