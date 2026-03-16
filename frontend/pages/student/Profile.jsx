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
        <div>
            <StudentNavbar />

            <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
                <h2 className="text-xl font-semibold mb-4">My Profile</h2>

                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Role:</strong> {profile.role}</p>
                <p>
                    <strong>Joined:</strong>{" "}
                    {new Date(profile.created_at).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default Profile;