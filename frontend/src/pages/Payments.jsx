import { useEffect, useState } from "react";
import API from "../api";
import { MdPayments } from "react-icons/md";


const empty = { user: "", course: "", amount: "", couponCode: "", method: "Manual" };

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [users, setUsers]       = useState([]);
  const [courses, setCourses]   = useState([]);
  const [form, setForm]         = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage]   = useState("");

  const fetchAll = async () => {
    try {
      
    const [p, u, c] = await Promise.all([API.get("/payments"), API.get("/users"), API.get("/courses")]);
    console.log("Users", u.data)
    setPayments(p.data); setUsers(u.data); setCourses(c.data);
    } catch(err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/payments", form);
      setForm(empty);
      setShowForm(false);
      setMessage("Payment recorded successfully!");
      fetchAll();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment record?")) return;
    await API.delete(`/payments/${id}`);
    fetchAll();
  };

  const total = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-gray-950 min-h-screen pt-20">    
      <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><MdPayments className="text-yellow-100"/> Payment Management</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm cursor-pointer">
          {showForm ? "Cancel" : "+ New Payment"}
        </button>
      </div>

      <div className="bg-transparent border border-white rounded-xl px-5 py-3 mb-5 flex gap-6 text-sm text-white">
        <span>Total Records: <strong>{payments.length}</strong></span>
        <span>Total Revenue: <strong className="text-green-700">₹{total.toFixed(2)}</strong></span>
      </div>

      {message && <p className={`mb-4 text-sm ${message.includes("Error") || message.includes("Invalid") ? "text-red-500" : "text-green-600"}`}>{message}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-950 rounded-xl shadow-[0px_0px_10px_gray] p-5 mb-6 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 font-semibold text-gray-700">Record New Payment</h2>
          <select className="border border-gray-500 bg-gray-950 text-gray-400 rounded-xl px-3 py-2 text-sm" value={form.user}
            onChange={(e) => setForm({ ...form, user: e.target.value })} required>
            <option value="">Select User</option>
            {users.map((u) => <option key={u._id} value={u._id} className="text-white bg-gray-600">{u.name}</option>)}
            
          </select>
          <select className="border border-gray-500 bg-gray-950 text-gray-400 rounded-xl px-3 py-2 text-sm" value={form.course}
            onChange={(e) => {
              const c = courses.find((x) => x._id === e.target.value);
              setForm({ ...form, course: e.target.value, amount: c?.price || "" });
            }} required>
            <option value="">Select Course</option>
            {courses.map((c) => <option key={c._id} value={c._id}>{c.title} — ₹{c.price}</option>)}
          </select>
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Amount (₹)" type="number"
            value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Coupon Code (optional)"
            value={form.couponCode} onChange={(e) => setForm({ ...form, couponCode: e.target.value })} />
          <select className="border border-gray-500 bg-gray-950 text-gray-400 rounded-xl px-3 py-2 text-sm col-span-2" value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}>
            <option>Manual</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Net Banking</option>
          </select>
          <button className="col-span-2 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">Submit Payment</button>
        </form>
      )}

      <div className="bg-gray-950 shadow-[0px_0px_10px_gray] mt-2 rounded-xl  overflow-x-auto md-block">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>{["User", "Course", "Amount", "Discount", "Method", "Date", ""].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No payments yet</td></tr>
            ) : payments.map((p, i) => (
              <tr key={p._id} className={i % 2 === 0 ? "bg-gray-800 text-gray-500" : "bg-gray-800 text-gray-500"}>
                <td className="px-4 py-3 font-medium">{p.user?.name || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{p.course?.title || "—"}</td>
                <td className="px-4 py-3 text-green-700 font-semibold">₹{p.amount}</td>
                <td className="px-4 py-3 text-gray-500">{p.discount > 0 ? `${p.discount}% (${p.coupon})` : "—"}</td>
                <td className="px-4 py-3 text-gray-500">{p.method}</td>
                <td className="px-4 py-3 text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>

  );
}
