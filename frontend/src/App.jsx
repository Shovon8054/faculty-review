import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddFaculty from '../pages/admin/AddFaculty';
import ManageFaculty from '../pages/admin/ManageFaculty';
import EditFaculty from '../pages/admin/EditFaculty';
import FacultyWithReviews from '../pages/student/FacultyWithReviews';
import AddRating from '../pages/student/AddRating';
import Queries from '../pages/student/Queries';
import EditQuery from '../components/EditQuery';
import ManageUsers from '../pages/admin/ManageUsers';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signin" element={<Sign/>} />
        <Route path="/home" element={<Home/>} />
        {/* admin section */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-add-faculty" element={<AddFaculty/>} />
        <Route path="/admin-manage-faculty" element={<ManageFaculty/>} />
        <Route path="/admin/faculty/edit/:id" element={<EditFaculty/>} />
        <Route path="/admin/users" element={<ManageUsers/>} />
        
        {/* student section */}
        <Route path="/student/faculty-with-review" element={<FacultyWithReviews/>} />
        <Route path="/student/add-rating/:id" element={<AddRating/>} />
        {/* queries */}
        <Route path="/student/queries" element={<Queries/>} />
        <Route path="/student/queries" element={<Queries/>} />
        <Route path="/student/queries/edit/:id" element={<EditQuery/>} />

        
      </Routes>
    </div>
  )
}

export default App

