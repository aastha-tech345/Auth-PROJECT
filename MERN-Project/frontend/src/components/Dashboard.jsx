import React from "react";
import { useNavigate } from "react-router-dom";
import DigitalClock from "../components/DigitalClock";
import RecursiveList from "../components/RecursiveList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-5 fw-bold">Dashboard</h1>
          <p className="text-secondary">Welcome to your MERN Stack Test Application</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card bg-dark text-light shadow-sm p-4 mb-4">
            <h2 className="h5 mb-3 text-center">Digital Clock</h2>
            <DigitalClock />
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm p-4">
            <h2 className="h5 mb-3">Hierarchical Data (Recursive List)</h2>
            <RecursiveList />
          </div>
        </div>
      </div>
    </div>
  );
}
