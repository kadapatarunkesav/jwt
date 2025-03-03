import React, { useEffect, useState, forwardRef  } from "react";
import styles from "./PayrollPreview.module.css";
import axios from "axios";

const PayrollPreview = forwardRef(() => {
  const [error, setError] = useState("");

  const [Salary, setSalary] = useState([]);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

        const id = localStorage.getItem("userId");

        if (!token) {
          setError("User is not authenticated");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/payroll/get/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSalary(response.data); // Store the response data in state
      } catch (error) {
        setError("Failed to fetch Salary data");
      }
    };
    fetchSalary();
  }, []);

  return (
    <>
      <div className={styles.error}>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className={styles.overlay}>
        <div  className={styles.popup}>
          <div className={styles.heading}>
            <h2>Salary Slip</h2>
          </div>
          <div className={styles.tab}>
            <form>
              <label>Base Salary:{Salary.baseSalary}</label>
              <br />
              <label>Bonus:{Salary.bonus}</label>
              <br />
              <label>Deductions:{Salary.deductions}</label>
              <br />
              <label>Allowances:{Salary.allowances}</label>
              <br />
              <label>NetPay:{Salary.netPay}</label>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
})

export default PayrollPreview;