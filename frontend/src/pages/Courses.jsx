import { useEffect, useState } from "react";
import API from "../api";
import { FaBook } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";


const empty = { title: "", description: "", instructor: "", price: "", category: "General", duration: "" };

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm]       = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]     = useState("");

  const fetchCourses = async () => {
    const { data } = await API.get("/courses");
    setCourses(data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) {
        await API.put(`/courses/${editing}`, form);
        setEditing(null);
      } else {
        await API.post("/courses", form);
      }
      setForm(empty);
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving course");
    }
  };

  const handleEdit = (c) => {
    setForm({ title: c.title, description: c.description, instructor: c.instructor, price: c.price, category: c.category, duration: c.duration });
    setEditing(c._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await API.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="bg-gray-950 min-h-screen pt-20">
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 "><FaBook className="text-green-600"/> Course Management</h1>
        <button onClick={() => { setShowForm(!showForm); setEditing(null); setForm(empty); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm cursor-pointer">
          {showForm ? "Cancel" : "+ Add Course"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-950 rounded-xl shadow-[0px_0px_10px_gray] p-5 mb-6 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 font-semibold text-gray-700">{editing ? "Edit Course" : "New Course"}</h2>
          {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm col-span-2" placeholder="Course Title"
            value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm col-span-2" placeholder="Description" rows={2}
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Instructor"
            value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Price (₹)" type="number"
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Category"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Duration (e.g. 4 weeks)"
            value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          <button className="col-span-2 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">
            {editing ? "Update Course" : "Add Course"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.length === 0 && <p className="text-gray-400 col-span-2 text-center py-10">No courses yet.</p>}
        {courses.map((c) => (
          <div key={c._id} className="bg-gray-950 rounded-xl shadow-[0px_0px_10px_gray] p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">{c.title}</h3>
                <p className="text-xs text-indigo-500">{c.category} · {c.duration}</p>
              </div>
              <span className="text-green-600 font-bold text-sm">₹{c.price}</span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">{c.description}</p>
            <p className="text-xs text-gray-400 flex items-center gap-2"> <IoPersonSharp /> {c.instructor}</p>
            <div className="flex gap-2 mt-1">
              <button onClick={() => handleEdit(c)} className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200 cursor-pointer">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 cursor-pointer">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
