import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// ADMIN COMPONENTS
import Sidebar from "./components/Sidebar";
import AllSessions from "./pages/admin/AllSessions";
import Dashboard from "./pages/admin/Dashboard";
import TutorsList from "./pages/admin/TutorsList";
import AddTutor from "./pages/admin/AddTutor";
import Login from "./pages/admin/Login";

// ✅ TUTOR PAGES (ADD THESE)
import TutorDashboard from "./pages/tutor/TutorDashboard";
import TutorProfile from "./pages/tutor/TutorProfile";
import TutorSessions from "./pages/tutor/TutorSession";

// CONTEXT
import { AdminContext } from "./context/AdminContext";
import { TutorContext } from "./context/TutorContext";

export default function App() {
  const { aToken } = useContext(AdminContext);
  const { tToken } = useContext(TutorContext);

  // ⛔ WAIT UNTIL CONTEXT READY
  if (aToken === null || tToken === null) return null;

  // ================= ADMIN / TUTOR PANEL =================
  if (aToken || tToken) {
    return (
      <main>
        <ToastContainer position="bottom-right" />

        <div className="bg-white text-black">
          <div className="mx-auto max-w-[1440px] flex">

            <Sidebar />

            <div className="flex-1 p-4">
              <Routes>

                {/* ================= ADMIN ROUTES ================= */}
                {aToken && (
                  <>
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/all-sessions" element={<AllSessions />} />
                    <Route path="/add-tutor" element={<AddTutor />} />
                    <Route path="/tutors-list" element={<TutorsList />} />
                  </>
                )}

                {/* ================= TUTOR ROUTES ================= */}
                {tToken && (
                  <>
                    <Route path="/tutor-dashboard" element={<TutorDashboard />} />
                    <Route path="/tutor-profile" element={<TutorProfile />} />
                    <Route path="/tutor-sessions" element={<TutorSessions />} />
                  </>
                )}

                {/* ================= DEFAULT ================= */}
                <Route
                  path="/"
                  element={
                    aToken
                      ? <Navigate to="/admin-dashboard" />
                      : <Navigate to="/tutor-dashboard" />
                  }
                />
                <Route
                  path="*"
                  element={
                    <Navigate to={aToken ? "/admin-dashboard" : "/tutor-dashboard"} />
                  }
                />

              </Routes>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // ================= LOGIN =================
  return (
    <main>
      <ToastContainer position="bottom-right" />
      <Login />
    </main>
  );
}
