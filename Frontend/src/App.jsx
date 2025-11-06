import React from "react";
import Home from "./pages/Home/home.tsx";
import { Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utils/privateRoutes.jsx";
import ChatWindow from "./components/chatWindow/ChatWindow.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatwindow" element={<ChatWindow />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
