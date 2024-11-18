import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backendUrl from "../constants/backendUrl.js";

const Login = () => {
  const modelRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const closeModel = () => {
    modelRef.current.classList.add("hidden");
    navigate("/");
  };

  const handleLogin = async (email, password) => {
    const user = { email, password };

    const response = await axios.post(`${backendUrl}/api/auth/login`, user, {
      withCredentials: true,
    });

    if (response.data.status !== 200) alert(response.data.message);
    else {
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/");
    }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") closeModel();
  });

  return (
    <>
      <div
        className="absolute h-full w-full bg-black bg-opacity-40 flex justify-center items-center"
        ref={modelRef}
      >
        <div className="h-80 w-96 bg-white rounded-md flex flex-col justify-center gap-4 px-6 ">
          <span className="text-3xl">Login</span>

          <div className="flex flex-col">
            <input
              type="text"
              id="email"
              className="px-2 py-2 border-2 rounded"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              id="password"
              className="px-2 py-2 border-2 rounded"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <Link to={"/register"}>Don't have an account? Sign-up </Link>
            <button
              className="mt-5 bg-indigo-600 py-2 rounded text-white"
              onClick={() => handleLogin(email, password)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
