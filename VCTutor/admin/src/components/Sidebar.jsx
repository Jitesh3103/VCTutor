import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

// CONTEXTS
import { AdminContext } from "../context/AdminContext";
import { TutorContext } from "../context/TutorContext";
import { AppContext } from "../context/AppContext";

// ICONS
import { FaPlusSquare, FaClipboardList, FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {

  const { aToken, setAToken } = useContext(AdminContext);
  const { tToken, setTToken } = useContext(TutorContext);
  const { navigate } = useContext(AppContext);

  const logout = () => {

    // clear admin
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    // clear tutor
    if (tToken) {
      setTToken("");
      localStorage.removeItem("tToken");
    }

    navigate("/");
  };

  return (
    <div className="sm:w-1/5 sm:min-h-[98vh] sm:fixed bg-[#0f3d3e] rounded-xl m-2 flex flex-col justify-between">

      <div className="flex flex-col gap-y-6 pt-4 sm:pt-14">

        {/* LOGO */}
        <Link to="/" className="text-white font-bold text-xl flex flex-col pl-4">
          <span className="flex items-center gap-2">
            <span className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-black rounded-full font-bold">
              VC
            </span>
            tutor
          </span>

          <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded w-fit mt-1">
            Admin / Tutor Panel
          </span>
        </Link>

        {/* ADMIN MENU */}
        {aToken && (
          <div className="flex flex-col gap-2 mt-6">

            <NavLink to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <FaListAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/all-sessions"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <MdFactCheck />
              <span>Sessions</span>
            </NavLink>

            <NavLink to="/tutors-list"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <FaClipboardList />
              <span>Tutors List</span>
            </NavLink>

            <NavLink to="/add-tutor"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <FaPlusSquare />
              <span>Add Tutor</span>
            </NavLink>

          </div>
        )}

        {/* TUTOR MENU */}
        {tToken && (
          <div className="flex flex-col gap-2 mt-6">

            <NavLink to="/tutor-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <FaListAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/tutor-profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <FaClipboardList />
              <span>Profile</span>
            </NavLink>

            <NavLink to="/tutor-sessions"
              className={({ isActive }) =>
                isActive
                  ? "bg-yellow-400 text-black flex items-center gap-2 p-3 rounded"
                  : "text-white flex items-center gap-2 p-3 hover:bg-[#1f5c5d]"
              }>
              <MdFactCheck />
              <span>Sessions</span>
            </NavLink>

          </div>
        )}

      </div>

      {/* LOGOUT */}
      {(aToken || tToken) && (
        <div className="p-4">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <BiLogOut />
            Logout
          </button>
        </div>
      )}

    </div>
  );
};

export default Sidebar;
