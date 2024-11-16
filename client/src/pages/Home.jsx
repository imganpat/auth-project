import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import backendUrl from "../constants/backendUrl.js";

const Home = ({ username, setUsername, email, setEmail }) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`${backendUrl}`, {
        withCredentials: true,
      });
      setUsername(response.data.username);
      setEmail(response.data.email);
    };
    getUserData();
  }, [username, token, email]);

  useEffect(() => {
    if (!token) navigateToLogin();
    else navigate("/");
  }, [username, token, email]);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    setToken("");
    const response = await axios.get(`${backendUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    alert(response.data.message);
  };

  return (
    <div className=" h-screen w-screen bg-gradient-to-br from-teal-900 to-teal-950">
      <div className="h-full w-full flex justify-center items-center gap-10 flex-col">
        <div className="text-center">
          <div className="text-8xl text-teal-200 capitalize">{username}</div>
          <div className="text-2xl text-teal-300 mt-3">{email}</div>
        </div>
        <div className="flex gap-4">
          {!token && (
            <button
              className="text-xl px-10 py-2 rounded-md text-teal-200 border border-teal-200"
              onClick={navigateToLogin}
            >
              Login
            </button>
          )}

          {token && (
            <button
              className="text-xl px-10 py-2 rounded-md text-teal-200 border border-teal-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
        {/* <Login /> */}
      </div>
    </div>
  );
};

export default Home;
