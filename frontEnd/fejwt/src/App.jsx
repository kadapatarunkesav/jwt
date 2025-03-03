import React from "react";
import LoginForm from "./AuthComponents/LoginForm";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Leaves from "./Leaves";
import NavBar from "./NavBar";
import Registration from "./AuthComponents/Registration";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Inout from "./Inout";
import Payroll from "./Payroll";
import ManageLeaves from "./ManageLeaves";
import ManageRoles from "./ManageRoles";
import Timesheet from "./Timesheet";

const App = () => {
  const navigate = useNavigate();


  const handleLogin = () => {

    navigate("/dashboard");
  };

  const handleLogout = () => {

    localStorage.clear();
    navigate("/");
  };

  return (
    <>
    <NavBar onLogout={handleLogout} />
        <>
          <Routes>
            <Route path="/leaves" element={<Leaves/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/" element={<LoginForm onLogin={handleLogin}/>} />
            <Route path="/register" element={<Registration />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/inout" element={<Inout />} />
            <Route path="/manageLeaves" element={<ManageLeaves />} />
            <Route path="/manageRoles" element={<ManageRoles />} />
            <Route path="/timeSheet" element={<Timesheet />} />
          </Routes>
        </>
    </>
  );
};

export default App;
