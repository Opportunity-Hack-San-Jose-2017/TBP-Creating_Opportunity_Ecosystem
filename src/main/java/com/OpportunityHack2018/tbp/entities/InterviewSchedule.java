package com.OpportunityHack2018.tbp.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class InterviewSchedule {

    @Column
    private boolean scheduled;

    @Column
    private String startDate;

    @Column
    private String endDate;

    @Column
    private String location;

    @Column
    private boolean applicantConfirmed;

    @Column
    private boolean isFinished;

    public boolean isScheduled() {
        return scheduled;
    }

    public void setScheduled(boolean scheduled) {
        this.scheduled = scheduled;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isApplicantConfirmed() {
        return applicantConfirmed;
    }

    public void setApplicantConfirmed(boolean applicantConfirmed) {
        this.applicantConfirmed = applicantConfirmed;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }
}
