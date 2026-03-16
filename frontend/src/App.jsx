import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Login from '../pages/Login';
import Sign from '../pages/Sign';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddFaculty from '../pages/admin/AddFaculty';
import ManageFaculty from '../pages/admin/ManageFaculty';
import EditFaculty from '../pages/admin/EditFaculty';
import FacultyWithReviews from '../pages/student/FacultyWithReviews';
import AddRating from '../pages/student/AddRating';
import Queries from '../pages/student/Queries';
import EditQuery from '../components/EditQuery';
import ManageUsers from '../pages/admin/ManageUsers';
import Comment from '../components/Comment';
import Profile from '../pages/student/Profile';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signin" element={<Sign/>} />
        
        {/* admin section */}
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-add-faculty" element={<AddFaculty/>} />
        <Route path="/admin-manage-faculty" element={<ManageFaculty/>} />
        <Route path="/admin/faculty/edit/:id" element={<EditFaculty/>} />
        <Route path="/admin/users" element={<ManageUsers/>} />
        
        {/* student section */}
        <Route path="/student/faculty-with-review" element={<FacultyWithReviews/>} />
        <Route path="/student/add-rating/:id" element={<AddRating/>} />
        <Route path="/student/profile" element={<Profile/>} />
        {/* queries */}
        <Route path="/student/queries" element={<Queries/>} />
        <Route path="/student/queries" element={<Queries/>} />
        <Route path="/student/queries/edit/:id" element={<EditQuery/>} />
        <Route path="/student/comment/:id" element={<Comment/>} />

        
      </Routes>
    </div>
  )
}

export default App

