import { useEffect, useState } from "react";
import API from "../api";
import { RiCoupon2Fill } from "react-icons/ri";


const empty = { code: "", discount: "", maxUses: 100, expiryDate: "" };

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm]       = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]     = useState("");

  const fetchCoupons = async () => {
    const { data } = await API.get("/coupons");
    setCoupons(data);
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await API.post("/coupons", form);
      setForm(empty);
      setShowForm(false);
      fetchCoupons();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating coupon");
    }
  };

  const toggleActive = async (c) => {
    await API.put(`/coupons/${c._id}`, { isActive: !c.isActive });
    fetchCoupons();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    await API.delete(`/coupons/${id}`);
    fetchCoupons();
  };

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <div className="bg-gray-950 min-h-screen pt-20">
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><RiCoupon2Fill className="text-yellow-400"/> Coupon Management</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm cursor-pointer">
          {showForm ? "Cancel" : "+ New Coupon"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-950 rounded-xl shadow-[0px_0px_10px_gray] p-5 mb-6 grid grid-cols-2 gap-4">
          <h2 className="col-span-2 font-semibold text-gray-700">Create New Coupon</h2>
          {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm uppercase" placeholder="Coupon Code (e.g. SAVE20)"
            value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Discount (%)" type="number" min="1" max="100"
            value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} required />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" placeholder="Max Uses" type="number"
            value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} />
          <input className="border border-gray-500 text-gray-400 rounded-xl px-3 py-2 text-sm" type="date"
            value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} required />
          <button className="col-span-2 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 font-medium">Create Coupon</button>
        </form>
      )}

      <div className="bg-transparent rounded-xl shadow-[0px_0px_10px_gray] overflow-x-auto md-block mt-10">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>{["Code", "Discount", "Used / Max", "Expiry", "Status", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No coupons yet</td></tr>
            ) : coupons.map((c, i) => (
              <tr key={c._id} className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                <td className="px-4 py-3 font-mono font-bold text-indigo-600">{c.code}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">{c.discount}%</td>
                <td className="px-4 py-3 text-gray-500">{c.usedCount} / {c.maxUses}</td>
                <td className={`px-4 py-3 ${isExpired(c.expiryDate) ? "text-red-500" : "text-gray-500"}`}>
                  {new Date(c.expiryDate).toLocaleDateString()}
                  {isExpired(c.expiryDate) && <span className="ml-1 text-xs">(Expired)</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => toggleActive(c)} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200">
                    {c.isActive ? "Disable" : "Enable"}
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200">Delete</button>
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
