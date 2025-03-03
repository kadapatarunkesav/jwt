import React, { useEffect, useRef, useState } from "react";
import style from "./Payroll.module.css";
import PayrollPreview from "./PayrollPreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";



const Payroll = () => {

  const [salary, setSalary] = useState('')
  const componentRef = useRef();

  const downloadPDF = () => {

    const element = componentRef.current;

    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF();
      pdf.save("salary.pdf");
    });
  };
  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage

        const id = localStorage.getItem("userId");

       

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
      }
    };
    fetchSalary();
  }, []);

  return (
    <div className={style.main}>
      <div className={style.banners}>
        <div className={style.banner}>
          <h1>Salary Details</h1>
          {/* <ReactToPrint trigger={() => <button>Print</button>}
                content={() => componentRef.current}/> */}
          <button onClick={downloadPDF}>Download</button>
        </div>
      </div>
      <div className={style.labels}>
        <div className={style.boards}>
          <div className={style.bords}>
            <div className={style.num}>
              <h1>Monthly Salary :</h1>
            </div>
            <div  className={style.num}>
              <h1>₹  {salary.netPay}/-</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={style.tables}>
        <div ref={componentRef} className={style.datatable}>
          <PayrollPreview/>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
