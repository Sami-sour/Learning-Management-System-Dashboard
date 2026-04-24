import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { RiCoupon2Fill } from "react-icons/ri";

const cards = [
  { title: "Users",    icon: <IoPeople className="text-gray-400"/> , desc: "Manage students, instructors & admins", to: "/users",    color: "bg-indigo-50 border-indigo-200" },
  { title: "Courses",  icon: <FaBook className="text-green-600"/>, desc: "Add, edit and manage course catalog",   to: "/courses",  color: "bg-green-50 border-green-200" },
  { title: "Payments", icon: <MdPayments className="text-yellow-100"/>, desc: "Track enrollments and payment records", to: "/payments", color: "bg-yellow-50 border-yellow-200" },
  { title: "Coupons",  icon: <RiCoupon2Fill className="text-yellow-400"/>, desc: "Create and manage discount coupons",    to: "/coupons",  color: "bg-pink-50 border-pink-200" },
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="bg-gray-950 h-full pt-20">
    <div className="max-w-4xl mx-auto p-11">
      <h1 className="text-3xl font-bold text-gray-200 mb-1">Welcome, {user?.name} </h1>
      <p className="text-gray-500 mb-8">Learning Management System - Admin Dashboard</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
        {cards.map((c) => (
          <Link key={c.title} to={c.to}
            className={`block p-8 rounded-xl shadow-[0px_1px_12px_gray]  hover:bg-gray-900 transition bg-gray-950`}>
            <div className="text-3xl  mb-2">{c.icon}</div>
            <h2 className="text-lg text-white font-semibold ">{c.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
