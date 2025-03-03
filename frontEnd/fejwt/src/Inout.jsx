import React, { useEffect, useState } from "react";
import styless from "./Inout.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Inout = () => {
  const [error, setError] = useState("");
  const [InTime, setInTime] = useState('Null');
  const [outtime, setOutime] = useState('Null');
  const [workedtimmings, setworkedtimmings] = useState([]);

  const formatToHours = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (!dateTimeString) {
      return 'Null'; // Return null explicitly if input is null or undefined
    }
    if (isNaN(date.getTime())) {
      return 'Null'; // Return null if the date is invalid
    }
    const hours = date.getHours().toString().padStart(2, "0"); // 2-digit hour
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 2-digit minutes
    return `${hours}:${minutes}`;
  };
 
    const totalworktime = async () => {
      // Retrieve the JWT token from localStorage
      const token = localStorage.getItem("accessToken");
      const id = localStorage.getItem("userId");
  
  
      if (!token) {
        setError("You are not authenticated. Please log in first.");
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost:8080/time/totalwork/${id}`, // Replace with your endpoint
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        setworkedtimmings(response.data);
        setError("Timings updated successfully!");
      } catch (error) {
        console.error("Error occurred:", error.response || error.message);
        setError("Failed to update resource.");
      }
    };
    // totalworktime();


  const timeInHandler = async (e) => {
    e.preventDefault();

    // Retrieve the JWT token from localStorage
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authenticated. Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/time/start/${id}`, // Replace with your endpoint
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // Add the JWT token to the Authorization header
          },
        }
      );
      console.log(response.data);
      
      setError("Timings updated successfully!");
      workTime();
      
    } catch (error) {
      console.error("Error occurred:", error.response || error.message);
      setError("Failed to update resource.");
    }
  };
  const timeOutHandler = async () => {
    // Retrieve the JWT token from localStorage
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You are not authenticated. Please log in first.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:8080/time/end/${id}`, // Replace with your endpoint
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // Add the JWT token to the Authorization header
          },
        }
      );
      console.log(response.data);
      
      setError("Resource updated successfully!");
      workTime();
    } catch (error) {
      console.error("Error occurred:", error.response || error.message);
      setError("Failed to update resource.");
    }
  };


    const workTime = async () => {
      // Retrieve the JWT token from localStorage
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
        console.error("Error occurred:", error.response || error.message);
        setError("Failed to update resource.");
      }
    };
    useEffect(() => {
    workTime();
    totalworktime();

  }, []);
  return (
    <>
      <div className={styless.main}>
        <div className={styless.error}>
          {error && <p style={{ color: "Red" }}>{error}</p>}
        </div>
        <div className={styless.banners}>
          <div className={styless.applybanner}>
            <h1>Time Management</h1>
            <button onClick={timeInHandler}>Time In</button>
            <button onClick={timeOutHandler}>Time Out</button>
          </div>
        </div>
        <div className={styless.labels}>
          <div className={styless.boards}>
            <div className={styless.bords}>
              <div className={styless.num}>
                <h1>{formatToHours(InTime)}</h1>
              </div>
              <div className={styless.tyoe}>
                <h1>In Time</h1>
              </div>
            </div>
            <div className={styless.bords}>
              <div className={styless.num}>
                <h1>{formatToHours(outtime)}</h1>
              </div>
              <div className={styless.tyoe}>
                <h1>Out Time</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styless.tables}>
          <div className={styless.datatable}>
            <Table reponsive="true" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Working Hours</th>
                </tr>
              </thead>
              <tbody>
                {workedtimmings.length > 0 ? (
                  workedtimmings.map((leave,index) => (
                    <tr key={leave.id}>
                      <td>{leave.localDate}</td>
                      <td>{formatToHours(leave.loginTime)}</td>
                      <td>{formatToHours(leave.logoutTime)}</td>
                      <td>{(leave.timeWorked/60).toFixed(2)} Hrs</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{ color: "red" }} colSpan="6">
                      No leave records found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inout;
