package com.OpportunityHack2018.tbp.controllers;

import com.OpportunityHack2018.tbp.entities.Company;
import com.OpportunityHack2018.tbp.services.ApplicantService;
import com.OpportunityHack2018.tbp.services.ApplicationService;
import com.OpportunityHack2018.tbp.services.CompanyService;
import com.OpportunityHack2018.tbp.services.OpeningService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private ApplicantService applicantService;
    @Autowired
    private OpeningService openingService;

    @PostMapping(value = "/register", produces = "application/json")
    @ResponseBody
    public ModelMap register(@RequestBody String companyJSON,
                             HttpSession session){
        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        try{
            Company companyObject = mapper.readValue(companyJSON,Company.class);

            if(session.getAttribute("email")!=null)
            {
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message","Please sign out before registering.");
                return responseMap;
            }

            Company company = new Company();
            company.setAddress(companyObject.getAddress());
            company.setDescription(companyObject.getDescription());
            company.setEmail(companyObject.getEmail());
            company.setName(companyObject.getName());
            company.setPassword(companyObject.getPassword());
            company.setWebsite(companyObject.getWebsite());

            if(!companyService.register(company)){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Email already in use! Please try with a new email.");
            }else{
//	           session.setAttribute("email",applicantObject.getEmail());
                responseMap.addAttribute("statusCode", "200");
            }
        }catch (Exception e){
            e.printStackTrace();
            session.invalidate();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
        }
        return responseMap;
    }


    @PostMapping(value = "/signin", produces ="application/json" )
    @ResponseBody
    public ModelMap signin(@RequestBody String jsonObj,
                           HttpSession session){

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        try{
            Company companyObj = mapper.readValue(jsonObj, Company.class);

            Company company=companyService.fetch(companyObj.getEmail());
            if(company==null || !company.getPassword().equals(companyObj.getPassword())){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Incorrect Email or Password.");
                return responseMap;
            }
            if(!company.isVerified()){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Please verify account before sign in.");
                return responseMap;
            }
            if(session.getAttribute("email")!=null){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "You are already logged in");
                return responseMap;
            }
            session.setAttribute("email",companyObj.getEmail());
            responseMap.addAttribute("statusCode", "200");
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
            session.invalidate();
        }
        return responseMap;
    }

    @PostMapping(value = "/logout")
    @ResponseBody
    public ModelMap logout(HttpSession session){
        session.invalidate();
        ModelMap responseMap = new ModelMap();
        responseMap.addAttribute("statusCode", "200");
        return responseMap;
    }


}
