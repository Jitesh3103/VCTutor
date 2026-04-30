import React, { useState, useContext } from 'react';
import loginImg from "../../assets/login.png";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from '../../context/AdminContext';
import { TutorContext } from '../../context/TutorContext'; // ✅ ADD THIS
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currState, setCurrState] = useState('Admin');

  const { navigate, backendUrl } = useContext(AppContext);
  const { setAToken } = useContext(AdminContext);
  const { setTToken } = useContext(TutorContext); // ✅ ADD THIS

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      // 🔵 ADMIN LOGIN
      if (currState === "Admin") {

        const { data } = await axios.post(
          backendUrl + '/api/admin/login',
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          navigate('/admin-dashboard'); // ✅ better route
        } else {
          toast.error(data.message);
        }
      }

      // 🟢 TUTOR LOGIN
      else if (currState === "Tutor") {

        const { data } = await axios.post(
          backendUrl + '/api/tutor/login',
          { email, password }
        );

        if (data.success) {
          localStorage.setItem('tToken', data.token);

          // ✅ IMPORTANT (YOU WERE MISSING THIS)
          setTToken(data.token);

          navigate('/tutor-dashboard');
        } else {
          toast.error(data.message);
        }
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">

      <div className="flex h-full w-full">

        {/* Image Side */}
        <div className="w-1/2 hidden sm:block">
          <img 
            src={loginImg} 
            alt="login" 
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form Side */}
        <div className="flex items-center justify-center w-full sm:w-1/2">

          <form 
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5"
          >

            {/* Title */}
            <div className="w-full mb-4">
              <h3 className="text-2xl font-bold">
                <span className="text-secondary border-b-4 border-secondary">
                  {currState}
                </span> Login
              </h3>
            </div>

            {/* Email */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded"
            />

            {/* Password */}
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 border rounded"
            />

            {/* Submit */}
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded"
            >
              Login
            </button>

            {/* Toggle */}
            {currState === "Admin" ? (
              <p
                onClick={() => setCurrState("Tutor")}
                className="underline cursor-pointer text-blue-500"
              >
                Login as Tutor?
              </p>
            ) : (
              <p
                onClick={() => setCurrState("Admin")}
                className="underline cursor-pointer text-blue-500"
              >
                Login as Admin?
              </p>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
