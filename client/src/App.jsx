import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";

const App = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/"> */}
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* </Route> */}
      </>
    )
  );
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //   }
  // }, [localStorage.getItem("token")]);
  return <RouterProvider router={router}></RouterProvider>;
  // if (localStorage.getItem("token")) {
  //   return <Home />;
  // }
  // return <Login />;
};
export default App;
