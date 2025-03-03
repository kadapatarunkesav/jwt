import React, { useEffect, useState } from "react";
import styless from "./ManageLeaves.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";

const ManageRoles = () => {
  const [error, setError] = useState("");
  const [roleDetails, setroleDetails] = useState([]);

  const [filters, setfilters] = useState({
    firstname: "",
    role: "",
    email: "",
  });

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredRow(id);
  };

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/emp/roleDetails`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setroleDetails(response.data);
      } catch (error) {
        setError("Failed to fetch leave data");
      }
    };
    fetchAllRoles();
  }, []);

  const changeRoles = async (id, statusRole) => {

    console.log(statusRole);
    
    const token = localStorage.getItem("accessToken");
    try {
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.patch(
        `http://localhost:8080/emp/changeRoles/${id}`,
        { statusRole },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        alert(`Status updated to ${statusRole}`);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };

  const handelFilterChange = (e) => {
    const { name, value } = e.target;
    setfilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredData = roleDetails.filter((row) => {
    const matchesName = row.firstname
      ? row.firstname.toLowerCase().includes(filters.firstname.toLowerCase())
      : false;
    const matchEmail = row.email
      ? row.email.toLowerCase().includes(filters.email.toLowerCase())
      : true;

    const matchRoles = filters.role ? row.role === filters.role : true;

    return matchesName && matchEmail && matchRoles;
  });

  return (
    <>
      <div className={styless.main}>
        <div className={styless.error}>
          {error && <p style={{ color: "Red" }}>{error}</p>}
        </div>
        <div className={styless.banners}>
          <div className={styless.applybanner}>
            <h1>Role Management</h1>
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
              <input
                type="text"
                name="email"
                placeholder="Search by Email"
                value={filters.email}
                onChange={handelFilterChange}
              />
            </div>
            <div className={styless.bords}>
              <select
                name="role"
                value={filters.role}
                onChange={handelFilterChange}
              >
                <option value="">All Types</option>{" "}
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="EMPLOYEE">EMPLOYEE</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styless.tables}>
          <div className={styless.datatable}>
            <Table reponsive="true" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
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
                        <td>{row.email}</td>
                        <td>{row.role}</td>
                      </tr>
                      {hoveredRow === row.id && (
                        <tr>
                          <td
                            colSpan="3"
                            style={{
                              textAlign: "center",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <button
                              onClick={() => {
                                changeRoles(row.id, "EMPLOYEE");
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
                              EMPLOYEE
                            </button>

                            <button
                              onClick={() => {
                                changeRoles(row.id, "MANAGER");
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
                              MANAGER
                            </button>

                            <button
                              onClick={() => {
                                changeRoles(row.id, "ADMIN");
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
                              ADMIN
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default ManageRoles;
