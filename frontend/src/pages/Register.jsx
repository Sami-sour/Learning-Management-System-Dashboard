import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-transparent p-8 rounded-2xl w-full max-w-md shadow-[0px_1px_12px_gray]">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border border-gray-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-indigo-400"
            placeholder="Full Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full border border-gray-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-indigo-400 outline-none"
            placeholder="Email" type="email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="w-full border border-gray-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-indigo-400"
            placeholder="Password" type="password" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <select className="w-full border border-gray-600 bg-gray-950 text-white rounded-xl px-3 py-2 text-sm focus:outline-indigo-400"
            value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium cursor-pointer">Register</button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-500">
          Have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
