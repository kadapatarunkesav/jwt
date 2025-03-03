import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import styles from "./Leaves.module.css";
import PopupForm from "./PopupForm";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");
  const [SickLeave, setSickLeave] = useState('N/A');
  const [UnpaidLeave, setUnpaidLeave] = useState('N/A');
  const [AnnualLeave, setAnnualLeave] = useState('N/A');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const id=localStorage.getItem('userId')
        const token = localStorage.getItem("accessToken");
        
        const formData = new FormData(e.target);
        const data = {
            leaveType: formData.get("leaveType"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            reason: formData.get("reason"),
        };
        console.log(data);
        if (!token) {
          setError("User is not authenticated");
          return;
        }
        
        // Send data to backend here (e.g., using axios)

        const response = await axios.post(
          `http://localhost:8080/leave/applyByFilters/${id}`,
          data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data);
        
        handleClosePopup(); 
    };

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id=localStorage.getItem('userId')

      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/leave/empById/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      
      setLeaves(response.data); // Store the response data in state
    } catch (error) {
      setError("Failed to fetch leave data");
    }
  };
  const fetchBySickLeave = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

      const id=localStorage.getItem('userId')

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

      const id=localStorage.getItem('userId')

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

      const id=localStorage.getItem('userId')

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

  useEffect(() => {
    fetchLeaves();
    fetchBySickLeave();
    fetchByUnpaidLeave();
    fetchByAnnualLeave();
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.error}>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className={styles.banners}>
          <div className={styles.applybanner}>
            <h1>Leave Management</h1>
            <button onClick={handleOpenPopup}>Apply Leave</button>
            
          </div>
        </div>
        <div className={styles.labels}>
          <div className={styles.boards}>
            <div className={styles.bords}>
              <div className={styles.num}>
                <h1>{SickLeave}</h1>
              </div>
              <div className={styles.tyoe}>
                <h1>Sick</h1>
                <h1>Leaves</h1>
              </div>
            </div>
            <div className={styles.bords}>
              <div className={styles.num}>
                <h1>{UnpaidLeave}</h1>
              </div>
              <div className={styles.tyoe}>
                <h1>Unpaid</h1>
                <h1>Leaves</h1>
              </div>
            </div>
            <div className={styles.bords}>
              <div className={styles.num}>
                <h1>{AnnualLeave}</h1>
              </div>
              <div className={styles.tyoe}>
                <h1>Annual</h1>
                <h1>Leaves</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tables}>
          <div className={styles.datatable}>
            {isPopupOpen ?<PopupForm 
                isOpen={isPopupOpen} 
                onClose={handleClosePopup} 
                onSubmit={handleFormSubmit} 
            /> :<Table reponsive='true' striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.leaveType}</td>
                    <td>{leave.startDate}</td>
                    <td>{leave.endDate}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.duration}</td>
                    <td>{leave.status}</td>
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
          </Table>}  
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaves;
