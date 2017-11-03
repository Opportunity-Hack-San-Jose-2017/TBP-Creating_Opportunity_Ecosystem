package com.OpportunityHack2018.tbp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="applicant")
public class Applicant {
    @Id
    @Column(name = "email")
    private String email;

    @Column
    private String token;

    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String resumeURL;

    @Column
    private String phoneNumber;

    @Column
    @ElementCollection
    private Set<String> availability;

    @Column
    @ElementCollection
    private List<String> shift;

    @Column
    private String position;

    @Column
    private String introduction;

    @Column
    private String experience;

    @Column
    private String education;

    @Column
    private boolean verified;

    @Column
    private String hashValue;

    @Column
    private String city;

    @Column
    private String country;

    @Column
    private String language;

    @OneToMany(mappedBy = "applicant")
    @JsonBackReference
    private Set<Application> applications;

    @Column
    private int rating;

    @Column
    private int numberOfRatings;

    @ElementCollection
    private List<String> skillsSet;

    private int pendingApplications;

    private String imageUrl;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getHashValue() {
        return hashValue;
    }

    public void setHashValue(String hashValue) {
        this.hashValue = hashValue;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }

    public int getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(int pendingApplications) {
        this.pendingApplications = pendingApplications;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getSkillsSet() {
        return skillsSet;
    }

    public void setSkillsSet(List<String> skillsSet) {
        this.skillsSet = skillsSet;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<String> getAvailability() {
        return availability;
    }

    public void setAvailability(Set<String> availability) {
        this.availability = availability;
    }

    public List<String> getShift() {
        return shift;
    }

    public void setShift(List<String> shift) {
        this.shift = shift;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        if(rating<0 || rating>5) return;
        numberOfRatings++;
        this.rating = (this.rating+rating)/numberOfRatings;
    }

    public int getNumberOfRatings() {
        return numberOfRatings;
    }

    public void setNumberOfRatings(int numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getResumeURL() {
        return resumeURL;
    }

    public void setResumeURL(String resumeURL) {
        this.resumeURL = resumeURL;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
