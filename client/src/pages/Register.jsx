import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../constants/backendUrl.js";

const Register = () => {
  const modelRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const closeModel = () => {
    modelRef.current.classList.add("hidden");
    navigate("/");
  };

  const handleRegister = async (username, email, password) => {
    const user = { username, email, password };

    const response = await axios.post(`${backendUrl}/api/auth/register`, user, {
      withCredentials: true,
    });

    if (response.data.status !== 200) alert(response.data.message);
    else {
      alert("Register successful");
      navigate("/login");
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
        <div className="h-96 w-96 bg-white rounded-md flex flex-col justify-center gap-4 py-10 px-6 ">
          <span className="text-3xl">Sign Up</span>

          <div className="flex flex-col">
            <input
              type="text"
              id="username"
              className="px-2 py-2 border-2 rounded"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
            <Link to={"/login"}>Already have an account? Login </Link>
            <button
              className="mt-5 bg-indigo-600 py-2 rounded text-white"
              onClick={() => handleRegister(username, email, password)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
