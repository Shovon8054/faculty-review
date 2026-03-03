import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [typed, setTyped]=useState("")
  
    // useEffect function
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/student/faculty-with-review",
            {withCredentials: true,}
        );
        setFaculties(res.data);
      } catch (err) {
        console.error(err);
      }

    };

    fetchFaculties();
  }, []);

//   filtered function for search
  const filtered=(faculties.filter((f)=>{
    const search=typed.trim().toLowerCase();
    if (!search) return true;

    const name=(f.name||"").toLowerCase();
    const course=(f.courses||"").toLowerCase();

    return name.includes(search)||course.includes(search)
  }))


  return (
    <div className="min-h-screen bg-gray-50">
    <StudentNavbar />

    <div className="mx-auto w-full max-w-6xl px-4 py-6">
        {/* header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Faculty Reviews</h2>

            <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Search faculty name or course..."
                className="w-full rounded-lg border border-gray-600 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 sm:max-w-sm"
            />

            <p className="text-xs text-gray-600">
                Click <span className="font-semibold">Add Review</span> to submit
            </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((f) => {
            // ===== Calculations=====
            const total = f.total_reviews ?? 0;

            const avgTeaching = total ? (f.sum_teaching ?? 0) / total : 0;
            const avgMarking = total ? (f.sum_marking ?? 0) / total : 0;
            const avgBehaviour = total ? (f.sum_behaviour ?? 0) / total : 0;

            const rating = total ? (avgTeaching + avgMarking + avgBehaviour) / 3 : 0;

            
            const pct = Math.min(100, Math.max(0, (rating / 5) * 100));

            
            const hasReviews = total > 0;

            return (
            <div
                key={f.id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
                
                <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-gray-900">
                    {f.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-600">
                    <span className="font-medium text-gray-800">Courses:</span>{" "}
                    {f.courses || "—"}
                    </p>
                </div>

                {/* Overall rating */}
                <div className="shrink-0 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                    ⭐ {rating.toFixed(2)}
                </div>
                </div>

                {/*status + action button */}
                <div className="mt-3 flex items-center justify-between gap-3">
                <span
                    className={[
                    "inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium",
                    hasReviews
                        ? "border-green-100 bg-green-50 text-green-700"
                        : "border-yellow-100 bg-yellow-50 text-yellow-700",
                    ].join(" ")}
                >
                    {hasReviews ? `${total} review${total > 1 ? "s" : ""}` : "No reviews yet"}
                </span>
                    {/* =============================button==================================================== */}
                <button>
                    <Link
                        to={`/student/rate-faculty/${f.id}`}
                        className="inline-flex items-center rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 active:bg-gray-950"
                    >
                        Add Review
                    </Link>
                </button>
                </div>

                
                <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                    className="h-2 rounded-full bg-gray-900"
                    style={{ width: `${pct}%` }}
                    />
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                    Overall rating (out of 5)
                </p>
                </div>

                
                <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-blue-50 p-2 text-center">
                    <p className="text-[11px] font-medium text-blue-700">Teaching</p>
                    <p className="text-sm font-semibold text-blue-900">
                    {avgTeaching.toFixed(2)}
                    </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-2 text-center">
                    <p className="text-[11px] font-medium text-purple-700">Marking</p>
                    <p className="text-sm font-semibold text-purple-900">
                    {avgMarking.toFixed(2)}
                    </p>
                </div>

                <div className="rounded-xl bg-emerald-50 p-2 text-center">
                    <p className="text-[11px] font-medium text-emerald-700">
                    Behaviour
                    </p>
                    <p className="text-sm font-semibold text-emerald-900">
                    {avgBehaviour.toFixed(2)}
                    </p>
                </div>
                </div>
            </div>
            );
        })}
        </div>

        {faculties.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="text-sm font-medium text-gray-900">No faculty found</p>
        </div>
        )}
    </div>
    </div>
  );
}
