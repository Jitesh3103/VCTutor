import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContext } from "./context/AppContext";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./pages/Home";
import Tutors from "./pages/Tutors";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MySessions from "./pages/MySessions";
import Session from "./pages/Session";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Aboutus from "./pages/Aboutus";
import PrivacyPolicy from "./pages/Privacypolicy";

export default function App() {
  const { getTutorsData, loadUserProfileData, token } = useContext(AppContext);

  useEffect(() => {
    getTutorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  return (
    <main className="overflow-hidden bg-light text-tertiary">
      <ToastContainer position="bottom-right" />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/:subject" element={<Tutors />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/mysessions" element={<MySessions />} />
        <Route path="/my-sessions" element={<MySessions />} />
        <Route path="/session/:tutId" element={<Session />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </main>
  );
}
