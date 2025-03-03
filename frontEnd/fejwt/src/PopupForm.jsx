import React from "react";
import styles from "./PopupForm.module.css";


const PopupForm = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.heading}>
                    <h2>Leave Application</h2>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                </div>
                <div className={styles.tab}>
                <form onSubmit={onSubmit}>
                    <label>
                        Leave Type:
                        <select name="leaveType" required>
                            <option value="SICK">SICK </option>
                            <option value="MATERNITY">MATERNITY </option>
                            <option value="UNPAID">UNPAID </option>
                            <option value="ANNUAL">ANNUAL </option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Start Date:
                        <input type="date" id="date" name="startDate" required />
                    </label>
                    <br />
                    <label>
                        End Date:
                        <input type="date" id="date" name="endDate" required />
                    </label>
                    <br />
                    <label>
                        Reason for leave:
                        <input type="text" name="reason" placeholder="Reaseon for leave" />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default PopupForm;