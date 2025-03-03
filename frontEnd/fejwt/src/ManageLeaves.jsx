import React, { useEffect, useState } from "react";
import styless from "./ManageLeaves.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const ManageLeaves = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  // const [leaveUpdate, setleaveUpdate] = useState("");

  const [filters, setfilters] = useState({
    firstname: "",
    status: "",
    leaveType: "",
    startDate: "",
  });

  const [hoveredRow, setHoveredRow] = useState(null); 

  const handleMouseEnter = (id) => {
    setHoveredRow(id); 
  };

  useEffect(() => {
    const fetchAllLeaves = async () => {
      try {
        const token = localStorage.getItem("accessToken"); 

        if (!token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get(`http://localhost:8080/leave/allDTO`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setData(response.data); 
      } catch (error) {
        setError("Failed to fetch leave data");
      }
    };
    fetchAllLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem("accessToken");
    try {
      if (!token) {
        setError("User is not authenticated");
        return;
      }
      const response = await axios.patch(
        `http://localhost:8080/leave/leaveStatus/${id}`,
        { status },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        alert(`Status updated to ${status}`);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handelFilterChange = (e) => {
    const { name, value } = e.target;
    setfilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    const matchesName = row.firstname
      ? row.firstname.toLowerCase().includes(filters.firstname.toLowerCase())
      : false; 

    const matchesType = filters.leaveType
      ? row.leaveType.toLowerCase() === filters.leaveType.toLowerCase()
      : true;

    const matchesStartDate = filters.startDate
      ? row.startDate === filters.startDate
      : true;

    const matchesStatus = filters.status 
    ? row.status === filters.status : true;
    return matchesName && matchesType && matchesStartDate && matchesStatus;
  });


  return (
    <>
      <div className={styless.main}>
        <div className={styless.error}>
          {error && <p style={{ color: "Red" }}>{error}</p>}
        </div>
        <div className={styless.banners}>
          <div className={styless.applybanner}>
            <h1>Leave Management</h1>
          </div>
        </div>
        <div className={styless.labels}>
          <div className={styless.boards}>
            <div className={styless.bords}>
              <input
                type="text"
                name="firstname"
                placeholder="Search by Name"
                value={filters.firstname}
                onChange={handelFilterChange}
              />
            </div>
            <div className={styless.bords}>
              <select
                name="leaveType"
                value={filters.leaveType}
                onChange={handelFilterChange}
              >
                <option value="">All Types</option>{" "}
                <option value="SICK">SICK</option>
                <option value="UNPAID">UNPAID</option>
                <option value="ANNUAL">ANNUAL</option>
                <option value="MATERNITY">MATERNITY</option>
              </select>
            </div>
            <div className={styless.bords}>
              <select
                name="status"
                value={filters.status}
                onChange={handelFilterChange}
              >
                <option value="">All Status</option>{" "}
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styless.tables}>
          <div className={styless.datatable}>
            <Table responsive="true" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration</th>
                  <th>Reason</th>
                  <th>Leave Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <React.Fragment key={row.id}>
                      <tr
                        style={{ transition: "background-color 0.3s" }}
                        onMouseEnter={() => handleMouseEnter(row.id)}
                      >
                        <td>
                          {row.lastname}
                          {" " + row.firstname}
                        </td>
                        <td>{row.startDate}</td>
                        <td>{row.endDate}</td>
                        <td>{row.duration} Days</td>
                        <td>{row.reason}</td>
                        <td>{row.leaveType}</td>
                        <td>{row.status}</td>
                      </tr>
                      {hoveredRow === row.id && (
                        <tr>
                          <td
                            colSpan="7"
                            style={{
                              textAlign: "center",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <button
                              onClick={() => {
                                handleStatusChange(row.id, "PENDING");
                              }}
                              style={{
                                margin: "5px",
                                padding: "8px 16px",
                                backgroundColor: "orange",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              PENDING
                            </button>

                            <button
                              onClick={() => {
                                handleStatusChange(row.id, "REJECTED");
                              }}
                              style={{
                                margin: "5px",
                                padding: "8px 16px",
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              REJECT
                            </button>
                            
                            <button
                              onClick={() => {
                                handleStatusChange(row.id, "APPROVED");
                              }}
                              style={{
                                margin: "5px",
                                padding: "8px 16px",
                                backgroundColor: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              APPROVE
                            </button>

                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td style={{ color: "red" }} colSpan="7">
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

export default ManageLeaves;
