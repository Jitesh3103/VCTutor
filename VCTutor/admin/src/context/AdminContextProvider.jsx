import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "./AdminContext";
import { AppContext } from "./AppContext";

const AdminContextProvider = ({ children }) => {
  const { backendUrl } = useContext(AppContext);

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [tutors, setTutors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [dashData, setDashData] = useState(null);

  const authHeaders = { Authorization: `Bearer ${aToken}` };

  const getAllTutors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-tutors",
        {},
        { headers: authHeaders }
      );

      if (data.success) {
        setTutors(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllSessions = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/sessions",
        { headers: authHeaders }
      );

      if (data.success) {
        setSessions(data.sessions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/dashboard",
        { headers: authHeaders }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-session",
        { sessionId },
        { headers: authHeaders }
      );

      if (data.success) {
        toast.success(data.message);
        getAllSessions();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (tutorId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { tutorId },
        { headers: authHeaders }
      );

      if (data.success) {
        toast.success(data.message);
        getAllTutors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    tutors,
    sessions,
    dashData,
    getAllTutors,
    getAllSessions,
    getDashData,
    cancelSession,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
