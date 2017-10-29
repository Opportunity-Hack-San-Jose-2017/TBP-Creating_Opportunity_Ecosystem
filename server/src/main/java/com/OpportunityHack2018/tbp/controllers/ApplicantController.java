package com.OpportunityHack2018.tbp.controllers;


import com.OpportunityHack2018.tbp.entities.Applicant;
import com.OpportunityHack2018.tbp.services.ApplicantService;
import com.OpportunityHack2018.tbp.services.ApplicationService;
import com.OpportunityHack2018.tbp.services.OpeningService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/applicant")
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private OpeningService openingService;

    @PostMapping(value = "/register", produces="application/json")
    @ResponseBody
    public ModelMap register(@RequestBody String applicantJSON,
                             HttpSession session){
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT,true);
        ModelMap responseMap = new ModelMap();
        try{
            Applicant applicantObject = mapper.readValue(applicantJSON, Applicant.class);
//    		System.out.println(applicantObject.getEmail());

            if(session.getAttribute("email")!=null)
            {
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message","Please sign out before registering.");
                return responseMap;
            }

            Applicant applicant=new Applicant();
            applicant.setEducation(applicantObject.getEducation());
            applicant.setExperience(applicantObject.getExperience());
            applicant.setSkillsSet(applicantObject.getSkillsSet());
            applicant.setEmail(applicantObject.getEmail());
            applicant.setPassword(applicantObject.getPassword());
            applicant.setLastName(applicantObject.getLastName());
            applicant.setFirstName(applicantObject.getFirstName());
            if(!applicantService.register(applicant)){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Email already in use! Please try with a new email.");
            }else{
//	           session.setAttribute("email",applicantObject.getEmail());
                responseMap.addAttribute("statusCode", "200");
            }

        }
        catch (Exception e){
            e.printStackTrace();
            session.invalidate();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
        }
        return responseMap;
    }

    @PostMapping(value = "/signin")
    @ResponseBody
    public ModelMap signin(@RequestBody String json, HttpSession session){
        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();
        try{
            Applicant obj = mapper.readValue(json, Applicant.class);
//            System.out.println("Email :"+obj.getEmail());
            Applicant applicant=applicantService.fetch(obj.getEmail());

            if(applicant!=null && applicant.getPassword().equals(obj.getPassword())){
                if(!applicant.isVerified()){
                    responseMap.addAttribute("statusCode", "400");
                    responseMap.addAttribute("message", "Please verify your account before signing in.");
                    return responseMap;
                }
                if(session.getAttribute("email")!=null){
                    responseMap.addAttribute("statusCode", "400");
                    responseMap.addAttribute("message", "You are already signed in");
                    return responseMap;
                }
                session.setAttribute("email",applicant.getEmail());
                responseMap.addAttribute("statusCode", "200");
            }
            else{
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Username or password incorrect!");
                return responseMap;
            }
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
