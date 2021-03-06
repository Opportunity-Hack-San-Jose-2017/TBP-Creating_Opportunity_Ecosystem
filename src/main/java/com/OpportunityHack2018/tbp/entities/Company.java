package com.OpportunityHack2018.tbp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="company")
public class Company {
    @Id
    @Column(name = "email")
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String website;

    @Column
    private String address;

    @Column
    private String description;

    @Column
    private boolean verified;

    @Column
    private String hashValue;

    @Column
    private String token;

    @OneToMany(mappedBy = "company")
    @JsonBackReference
    private List<Opening> openings;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<Opening> getOpenings() {
        return openings;
    }

    public void setOpenings(List<Opening> openings) {
        this.openings = openings;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
