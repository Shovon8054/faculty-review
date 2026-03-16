import axios from "axios";
import StudentNavbar from "../../components/StudentNavbar";
import { useState, useEffect } from "react";


const Profile = () => {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/student/profile",
                { withCredentials: true }
            );

            setProfile(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 prevent crash before data loads
    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center">
        {/* Full-width Navbar */}
        <div className="w-full">
            <StudentNavbar />
        </div>

        {/* Profile Card */}
        <div className="w-full max-w-md mt-12 p-6 bg-white border border-gray-200 rounded-3xl shadow-lg">
            <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-md mb-4">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{profile.name}</h2>
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
            <div className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800 truncate">{profile.email}</span>
            </div>

            <div className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
                <span className="font-medium text-gray-600">Role:</span>
                <span className="text-gray-800">{profile.role}</span>
            </div>

            <div className="flex justify-between px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
                <span className="font-medium text-gray-600">Joined:</span>
                <span className="text-gray-800">
                {new Date(profile.created_at).toLocaleDateString()}
                </span>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;