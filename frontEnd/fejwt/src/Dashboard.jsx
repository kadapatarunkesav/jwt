import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [InTime, setInTime] = useState();
  const [outtime, setOutime] = useState();


  const [SickLeave, setSickLeave] = useState("N/A");
  const [UnpaidLeave, setUnpaidLeave] = useState("N/A");
  const [AnnualLeave, setAnnualLeave] = useState("N/A");


  const [userDetails, setuserDetails] = useState([]);
  const [error, setError] = useState("");

  const formatToHours = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (!dateTimeString) {
      return "Null"; // Return null explicitly if input is null or undefined
    }
    if (isNaN(date.getTime())) {
      return "Null"; // Return null if the date is invalid
    }
    const hours = date.getHours().toString().padStart(2, "0"); // 2-digit hour
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 2-digit minutes
    return `${hours}:${minutes}`;
  };

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const userEmail = localStorage.getItem("userEmail");

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/emp/details/${userEmail}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setuserDetails(response.data);
    } catch (error) {
      setError("Failed to fetch details");
    }
  };

  //setting up the admin role
  localStorage.setItem("userId", userDetails.id);

  //setting up the user role
  localStorage.setItem("userRole", userDetails.role);

  //printing the role of the user
  // console.log(localStorage.getItem('userRole'));


  const workTime = async () => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("accessToken");
    const id = localStorage.getItem("userId");

    if (!token) {
      setError("You are not authenticated. Please log in first.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/time/todaywork/${id}`, // Replace with your endpoint
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setInTime(response.data.loginTime);
      setOutime(response.data.logoutTime);
      setError("Resource updated successfully!");
    } catch (error) {
      // console.error("Error occurred:", error.response || error.message);
      setError("Failed to update resource.");
    }
  };

  const fetchBySickLeave = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id = localStorage.getItem("userId");

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/leave/byStatus/employeeId/${id}/status/SICK`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setSickLeave(response.data);
      // Store the response data in state
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };
  const fetchByUnpaidLeave = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id = localStorage.getItem("userId");

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/leave/byStatus/employeeId/${id}/status/UNPAID`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUnpaidLeave(response.data);
      // Store the response data in state
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };
  const fetchByAnnualLeave = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id = localStorage.getItem("userId");

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/leave/byStatus/employeeId/${id}/status/ANNUAL`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnnualLeave(response.data);
      // Store the response data in state
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };

  // useEffect(() => {
    fetchDetails();
  // }, []);

    workTime();
    fetchByAnnualLeave();
    fetchBySickLeave();
    fetchByUnpaidLeave();


  return (
    <>
      <div className="maind">
        <div className="detailsd">
          <div className="infod">
            <div className="picd">
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <div className="datad">
              <div className="infos">
                <h1>Welcome . . .</h1>
                <h1>
                  {userDetails.firstname} {userDetails.lasttname}
                </h1>
              </div>
              <div className="roles">
                <h4>Email ID : {userDetails.email}</h4>
                <h4>Company ID : {userDetails.id}</h4>
                <h4>Position : {userDetails.role}</h4>
              </div>
            </div>
            <div className="worktime">
              <button >Edit Profile</button>
              <button>Carrer Profile</button>
            </div>
          </div>
        </div>
        <div className="timed">
          <div className="minileaves">
            <h1>Sick :- {SickLeave}</h1>

            <h1>Unpaid:- {UnpaidLeave}</h1>

            <h1>Annual:- {AnnualLeave}</h1>
          </div>
          <div className="minitime">
            <h1>In Time :-</h1>
            <h1>{formatToHours(InTime)}</h1>
            <h1>Out Time :-</h1>
            <h1>{formatToHours(outtime)}</h1>
          </div>
        </div>

        <div className="workd">
          <div className="minileaves"></div>
          <div className="minitime"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
