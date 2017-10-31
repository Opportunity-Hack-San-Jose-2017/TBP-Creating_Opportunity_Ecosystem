package com.OpportunityHack2018.tbp.controllers;

import com.OpportunityHack2018.tbp.entities.Company;
import com.OpportunityHack2018.tbp.entities.Opening;
import com.OpportunityHack2018.tbp.services.ApplicantService;
import com.OpportunityHack2018.tbp.services.ApplicationService;
import com.OpportunityHack2018.tbp.services.CompanyService;
import com.OpportunityHack2018.tbp.services.OpeningService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;

@CrossOrigin
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

    @CrossOrigin
    @GetMapping("/profile")
    @ResponseBody
    public ModelMap getProfile(HttpSession session) {

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();
        System.out.println("Session ID in profile :"+session.getId());
        if (session.getAttribute("email") == null) {
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message", "Please sign in before requesting profile info.");
            return responseMap;
        }

        try {
            Company company=companyService.fetch(session.getAttribute("email").toString());
            responseMap.addAttribute("profile", company);
            responseMap.addAttribute("statusCode", "200");
        }catch (Exception e){
            responseMap.addAttribute("statusCode","400");
            e.printStackTrace();
        }
        return responseMap;
    }

    @CrossOrigin
    @PostMapping(value = "/postOpening", produces ="application/json" )
    @ResponseBody
    public ModelMap postOpening(@RequestBody String jobPosting,
                                HttpSession session
    ){
        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();
        try{
            Opening openingObj = mapper.readValue(jobPosting, Opening.class);
            System.out.println("Session id in post Opening :"+session.getId());
            if(session.getAttribute("email")==null){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Please log in to post a job");
                return responseMap;
            }   

            Opening opening=new Opening();
            opening.setDate(new Date());
            opening.setCompany(companyService.fetch(session.getAttribute("email").toString()));
            opening.setDescription(openingObj.getDescription());
            opening.setResponsibilities(openingObj.getResponsibilities());
            opening.setLocation(openingObj.getLocation());
            opening.setMinSalary(openingObj.getMinSalary());
            opening.setMaxSalary(openingObj.getMaxSalary());
            opening.setTitle(openingObj.getTitle());
//            opening.setActive(true);
            opening.setExperience(openingObj.getExperience());
            opening.setSkillsSet(openingObj.getSkillsSet());
            opening.setShift(openingObj.getShift());
            opening.setPublicTransport(openingObj.isPublicTransport());
            opening.setStatus(Opening.Status.OPEN);
            companyService.postOpening(opening);
            responseMap.addAttribute("statusCode", "200");
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
        }
        return responseMap;

    }

    @CrossOrigin
    @PostMapping(value = "/update", produces = "application/json")
    @ResponseBody
    public ModelMap update(@RequestBody String componyInfo,
                           HttpSession session){

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        if(session.getAttribute("email")==null){
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Please log in to update the Details !");
            return responseMap;
        }

        try {
            Company compObj = mapper.readValue(componyInfo,Company.class);

            Company company = companyService.fetch(session.getAttribute("email").toString());

            if(company==null){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Sorry the company with this email id does not exist.");
                return responseMap;
            }

            if(compObj.getDescription()!=null)
                company.setDescription(compObj.getDescription());
            if(compObj.getName()!=null)
                company.setName(compObj.getName());
            if(compObj.getPassword()!=null)
                company.setPassword(compObj.getPassword());
            if(compObj.getWebsite()!=null)
                company.setWebsite(compObj.getWebsite());
//            if(compObj.getImageUrl()!=null)
//                company.setImageURL(compObj.getImageUrl());
            if(compObj.getAddress()!=null)
                company.setAddress(compObj.getAddress());

            companyService.update(company);

        }catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Problem updating details. Please try again later");
            return responseMap;
        }

        return responseMap;
    }

    @CrossOrigin
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
                responseMap.addAttribute("company",company);
            }
        }catch (Exception e){
            e.printStackTrace();
            session.invalidate();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
        }
        return responseMap;
    }



    @CrossOrigin
    @PostMapping(value = "/signin", produces ="application/json" )
    @ResponseBody
    public ModelMap signin(@RequestBody String jsonObj,
                           HttpSession session){

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();
        System.out.println("Spring Session ID :"+session.getId());
        try{
            Company companyObj = mapper.readValue(jsonObj, Company.class);

            Company company=companyService.fetch(companyObj.getEmail());
            if(company==null || !company.getPassword().equals(companyObj.getPassword())){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Incorrect Email or Password.");
                return responseMap;
            }
//            if(!company.isVerified()){
//                responseMap.addAttribute("statusCode", "400");
//                responseMap.addAttribute("message", "Please verify account before sign in.");
//                return responseMap;
//            }
            if(session.getAttribute("email")!=null){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "You are already logged in");
                return responseMap;
            }
            session.setAttribute("email",companyObj.getEmail());
            System.out.println("Session email :"+session.getAttribute("email"));
            responseMap.addAttribute("statusCode", "200");
            responseMap.addAttribute("company",company);
            System.out.println("Spring Session ID after setting:"+session.getId());
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
