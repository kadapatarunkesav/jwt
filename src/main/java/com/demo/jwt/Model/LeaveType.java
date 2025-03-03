package com.demo.jwt.Model;

public enum LeaveType {
    SICK(10),
    MATERNITY(60),
    UNPAID(20),
    ANNUAL (10);

    private final int maxAllowed;

    LeaveType(int maxAllowed) {
        this.maxAllowed = maxAllowed;
    }

    public int getMaxAllowed() {
        return maxAllowed;
    }
}
