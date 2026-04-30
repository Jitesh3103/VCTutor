import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import loginImg from "../assets/login.png";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setCurrState] = useState("Login");

  const { navigate, backendUrl, setToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint = currState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload = currState === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <div className="flex h-full w-full">
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="login" className="object-cover h-full w-full" />
        </div>

        <div className="flex items-center justify-center w-full sm:w-1/2">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5"
          >
            <h3 className="text-2xl font-bold">
              <span className="text-secondary border-b-4 border-secondary">
                {currState}
              </span>
            </h3>

            {currState === "Sign Up" && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />

            <button className="bg-black text-white w-full py-2 rounded">
              {currState}
            </button>

            {currState === "Login" ? (
              <p
                onClick={() => setCurrState("Sign Up")}
                className="cursor-pointer text-blue-500 underline"
              >
                Create a new account?
              </p>
            ) : (
              <p
                onClick={() => setCurrState("Login")}
                className="cursor-pointer text-blue-500 underline"
              >
                Already have an account?
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
