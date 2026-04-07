import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../../components/AdminNavbar"
// import Footer from "../../components/Footer";

const ManageUsers = () => {
    const [users, setUsers]=useState([]);

    useEffect(()=>{
        fetchUsers();
    },[])

    const fetchUsers=async()=>{
        try{
            const res = await axios.get("http://localhost:8080/api/admin/users",{
                withCredentials:true
            });
            setUsers(res.data)
        }catch (err) {
        console.error(err);
        }
    }

    // update block/unblock
    const updateUser=async(id)=>{
        try{
            const res=await axios.patch(`http://localhost:8080/api/admin/users/${id}`,
                {},
                {withCredentials:true}
            )

            setUsers(users.map((u)=>u.id===id? res.data:u))

        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div className="min-h-screen bg-gray-100">
    <AdminNavbar />

    <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">All Users</h1>

        <div className="space-y-4">
        {users.map((u) => (
            <div
            key={u.id}
            className="bg-white shadow-sm rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
            <div className="space-y-1">
                <p className="font-medium">Name: <span className="font-normal">{u.name}</span></p>
                <p className="font-medium">Email: <span className="font-normal">{u.email}</span></p>
                <p className="font-medium">Role: <span className="font-normal">{u.role}</span></p>
                <p className="font-medium">Status: 
                <span className={`font-normal ${u.is_blocked ? 'text-red-600' : 'text-green-600'}`}>
                    {u.is_blocked ? "Blocked" : "Active"}
                </span>
                </p>
                {u.role !== "admin" && (
                <button
                    onClick={() => updateUser(u.id)}
                    className={`mt-2 px-4 py-1 rounded ${
                    u.is_blocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                    {u.is_blocked ? "Unblock" : "Block"}
                </button>
                )}
            </div>
            </div>
        ))}
        </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default ManageUsers
