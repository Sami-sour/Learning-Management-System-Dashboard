import { useEffect, useState } from "react";
import API from "../api";
import { IoPeople } from "react-icons/io5";


export default function Users() {
  const [users, setUsers]   = useState([]);
  const [error, setError]   = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/api/users");
      setUsers(data);
    } catch {
      setError("Failed to load users");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/api/users/${id}`);
    fetchUsers();
  };

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) ||
           u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roleColor = { admin: "bg-red-100 text-red-700", instructor: "bg-yellow-100 text-yellow-700", student: "bg-green-100 text-green-700" };

  return (
    <div className="bg-gray-950 min-h-screen pt-20">
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-300 mb-4 flex items-center gap-2"><IoPeople className="text-gray-400"/> Users Management</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <input className="w-full border border-white text-white rounded-xl px-3 py-2 mb-5 text-sm focus:outline-indigo-400 "
        placeholder="Search by name or email..." value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <div className="bg-transparent shadow-[0px_0px_10px_gray] mt-3 rounded-xl  overflow-x-auto md-block overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              {["Name", "Email", "Role", "Joined", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-400">No users found</td></tr>
            ) : filtered.map((u, i) => (

              <tr key={u._id} className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                <td className="px-4 py-3 font-medium text-gray-300">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleColor[u.role]}`}>{u.role}</span>
                </td>
                <td className="px-4 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(u._id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">{filtered.length} user(s) found</p>
    </div>
    </div>
  );
}
