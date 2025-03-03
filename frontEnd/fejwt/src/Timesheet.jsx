import React, { useEffect, useState } from "react";
import styless from "./Timesheet.module.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Timesheet = () => {
  const [date, setDate] = useState(new Date());


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

  const [error, setError] = useState("");

  const [timeDetails, settimeDetails] = useState([]);
  useEffect(() => {
  const fetchTimeDetails = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id = localStorage.getItem("userId");

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/time/allWorkById/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      settimeDetails(response.data);
      // Store the response data in state
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };

    fetchTimeDetails();
  }, []);

  return (
    <>
      <div className={styless.main}>
        <div className={styless.error}>
          {error && <p style={{ color: "Red" }}>{error}</p>}
        </div>
        <div className={styless.banners}>
          <div className={styless.applybanner}>
            <h1>Time Sheet </h1>
          </div>
        </div>
        <div className={styless.labels}>
          <div className={styless.boards}>
            <div className={styless.bords}>
              <div className={styless.tyoe}>
                <h1>Date :</h1>
              </div>
              <div className={styless.num}>
                {/* <input type='date'></input> */}
                <h2>
                  <DatePicker
                  selected={date}
                  name="date"
                    onChange={(d)=>setDate(d)}
                    className={styless.calendar}
                    dateFormat={"yyyy-MM-dd"}
                  />
                </h2>
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
                {timeDetails.length > 0 ? (
                  timeDetails.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.localDate}</td>
                      <td>{formatToHours(leave.loginTime)}</td>
                      <td>{formatToHours(leave.logoutTime)}</td>
                      <td>{(leave.timeWorked / 60).toFixed(2)} Hrs</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td style={{ color: "red" }} colSpan="6">
                      No leave records yet
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

export default Timesheet;
