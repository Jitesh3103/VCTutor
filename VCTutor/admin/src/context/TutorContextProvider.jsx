import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { TutorContext } from "./TutorContext";
import { AppContext } from "./AppContext";

const TutorContextProvider = (props) => {

  const { backendUrl } = useContext(AppContext);

  const [tToken, setTToken] = useState(
    localStorage.getItem("tToken") || ""
  );

  const [sessions, setSessions] = useState([]);
  const [dashData, setDashData] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/tutor/dashboard",
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getSessions = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/tutor/sessions",
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        setSessions(data.sessions);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/tutor/complete-session",
        { sessionId },
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getSessions();
        getDashData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/tutor/cancel-session",
        { sessionId },
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getSessions();
        getDashData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/tutor/profile",
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProfile = async (updateData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/tutor/update-profile",
        updateData,
        { headers: { ttoken: tToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getProfileData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    tToken,
    setTToken,
    sessions,
    setSessions,
    dashData,
    setDashData,
    profileData,
    setProfileData,
    getSessions,
    getDashData,
    getProfileData,
    updateProfile,
    completeSession,
    cancelSession
  };

  return (
    <TutorContext.Provider value={value}>
      {props.children}
    </TutorContext.Provider>
  );
};

export default TutorContextProvider;