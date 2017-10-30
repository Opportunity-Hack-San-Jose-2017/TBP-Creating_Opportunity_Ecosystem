package com.OpportunityHack2018.tbp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="opening")
public class Opening {

    @Id
    @GeneratedValue
    @Column(name = "opening_id")
    private int opening_id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String responsibilities;

    @Column
    private int experience;

    @Column
    private String shift;

    @Column
    private boolean publicTransport;

    @Column
    private String location;

    @Column
    private Integer minSalary;

    @Column
    private Integer maxSalary;

    @ElementCollection
    private List<String> skillsSet;

    public enum Status{OPEN,CANCELLED,FILLED}

    @Column
    public Status status;

    @Column
    @DateTimeFormat(pattern="yyyy-MM-dd-HH")
    private Date date;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn
    @JsonIgnore
    private Company company;

    @OneToMany(mappedBy = "opening")
    private List<Application> applications;

    public int getOpening_id() {
        return opening_id;
    }

    public void setOpening_id(int opening_id) {
        this.opening_id = opening_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(Integer minSalary) {
        this.minSalary = minSalary;
    }

    public Integer getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Integer maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }

    public boolean isPublicTransport() {
        return publicTransport;
    }

    public void setPublicTransport(boolean publicTransport) {
        this.publicTransport = publicTransport;
    }

    public List<String> getSkillsSet() {
        return skillsSet;
    }

    public void setSkillsSet(List<String> skillsSet) {
        this.skillsSet = skillsSet;
    }


}
