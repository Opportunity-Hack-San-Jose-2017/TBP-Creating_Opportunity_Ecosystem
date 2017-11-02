package com.OpportunityHack2018.tbp.controllers;


import com.OpportunityHack2018.tbp.entities.Applicant;
import com.OpportunityHack2018.tbp.entities.Application;
import com.OpportunityHack2018.tbp.entities.Opening;
import com.OpportunityHack2018.tbp.services.ApplicantService;
import com.OpportunityHack2018.tbp.services.ApplicationService;
import com.OpportunityHack2018.tbp.services.OpeningService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/applicant")
@CrossOrigin
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private OpeningService openingService;

    @CrossOrigin
    @GetMapping(value = "/profile")
    @ResponseBody
    public ModelMap getProfile(ModelMap model,HttpSession session){
        //System.out.println("Trying to get the applicant with email :"+email);
        ModelMap map = new ModelMap();
        if(session.getAttribute("email")==null) {
            System.out.println("Not signed in");
            map.addAttribute("statusCode", "400");
            return map;
        }

        try {
            Applicant applicant=applicantService.fetch(session.getAttribute("email").toString());
            System.out.println("Found applicant "+applicant.toString());
            map.addAttribute("profile", applicant);
            map.addAttribute("statusCode", "200");
            return map;
        }
        catch(Exception e){
            e.printStackTrace();
            map.addAttribute("statusCode", "400");
            return map;
        }
    }

    @CrossOrigin
    @PostMapping(value = "/register", produces="application/json")
    @ResponseBody
    public ModelMap register(@RequestBody Applicant applicant,
                             HttpSession session){
        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        try{
//            Applicant applicantObject = mapper.readValue(applicantJSON, Applicant.class);
////    		System.out.println(applicantObject.getEmail());
//
//            if(session.getAttribute("email")!=null)
//            {
//                responseMap.addAttribute("statusCode", "400");
//                responseMap.addAttribute("message","Please sign out before registering.");
//                return responseMap;
//            }
//
//            Applicant applicant=new Applicant();
//            applicant.setEducation(applicantObject.getEducation());
//            applicant.setExperience(applicantObject.getExperience());
//            System.out.println(applicantObject.getSkillsSet());
//            applicant.setSkillsSet(applicantObject.getSkillsSet());
            System.out.println("Skill Set set as :"+applicant.getSkillsSet());
//            applicant.setEmail(applicantObject.getEmail());
//            applicant.setPassword(applicantObject.getPassword());
//            applicant.setLastName(applicantObject.getLastName());
//            applicant.setFirstName(applicantObject.getFirstName());
//            applicant.setPhoneNumber(applicantObject.getPhoneNumber());
//            applicant.setAvailability(applicantObject.getAvailability());
//            applicant.setShift(applicantObject.getShift());
//            applicant.setCity(applicantObject.getCity());
//            applicant.setCountry(applicantObject.getCountry());
//            applicant.setRating(0);
//            applicant.setPosition(applicantObject.getPosition());
//            applicant.setNumberOfRatings(0);

            if(applicant.getPassword()==null || applicant.getEmail()==null || applicant.getFirstName() == null || applicant.getLastName()==null){
                responseMap.addAttribute("statusCode",403);
                responseMap.addAttribute("message","Invalid registration form data. Check Email, Password and name.");
                return responseMap;
            }
            if(!applicantService.register(applicant)){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Email already in use! Please try with a new email.");
            }else{
//	           session.setAttribute("email",applicantObject.getEmail());
                responseMap.addAttribute("statusCode", "200");
                responseMap.addAttribute("applicant",applicant);
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


    @PostMapping(value = "/update")
    @ResponseBody
    @CrossOrigin
    public ModelMap update(@RequestBody String json, HttpSession session) {

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        if(session.getAttribute("email")==null){
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message","Please sign in before updating.");
            return responseMap;
        }
        try{
            Applicant reqObj = mapper.readValue(json, Applicant.class);
            Applicant applicant=applicantService.fetch(session.getAttribute("email").toString());

            if(applicant==null){
                responseMap.addAttribute("statusCode", "400");
                responseMap.addAttribute("message", "Email could not be found. Make sure you are registered.");
                return responseMap;
            }


            System.out.println("intro: "+reqObj.getIntroduction());


            if(reqObj.getFirstName()!=null)
                applicant.setFirstName(reqObj.getFirstName());
            if(reqObj.getLastName()!=null)
                applicant.setLastName(reqObj.getLastName());
            if(reqObj.getIntroduction()!=null)
                applicant.setIntroduction(reqObj.getIntroduction());
            if(reqObj.getExperience()!=null)
                applicant.setExperience(reqObj.getExperience());
            if(reqObj.getSkillsSet()!=null)
                applicant.setSkillsSet(reqObj.getSkillsSet());
            if(reqObj.getEducation()!=null)
                applicant.setEducation(reqObj.getEducation());
            if(reqObj.getPhoneNumber()!=null)
                applicant.setPhoneNumber(reqObj.getPhoneNumber());
            if(reqObj.getPosition()!=null)
                applicant.setPosition(reqObj.getPosition());
            if(reqObj.getAvailability()!=null)
                applicant.setAvailability(reqObj.getAvailability());
            if(reqObj.getShift()!=null)
                applicant.setShift(reqObj.getShift());
            if(reqObj.getCity()!=null)
                applicant.setCity(reqObj.getCity());
            if(reqObj.getCountry()!=null)
                applicant.setCity(reqObj.getCountry());
            if(reqObj.getImageUrl()!=null)
                applicant.setImageUrl(reqObj.getImageUrl());
//            if(reqObj.getResume()!=null)
//                applicant.setEducation(reqObj.getResume());
            applicantService.save(applicant);
            responseMap.addAttribute("applicant",applicant);
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
            return responseMap;
        }
        responseMap.addAttribute("statusCode", "200");

        return responseMap;
    }


    @CrossOrigin
    @PostMapping(value = "/apply",produces="application/json")
    @ResponseBody
    public ModelMap apply(@RequestBody String applicantJSON, HttpSession session){


        ModelMap responseMap = new ModelMap();
        if(session.getAttribute("email")==null) {
            System.out.println("Please login to apply");
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message","Please sign out before registering.");
        }
        try {
            JSONObject obj=new JSONObject(applicantJSON);
            System.out.println("Job ID:"+obj.getInt("opening_id"));
            int statusCode=applicantService.apply(obj.getInt("opening_id"), session.getAttribute("email").toString());
            if(statusCode==200){
                responseMap.addAttribute("statusCode", "200");
                responseMap.addAttribute("message","Job application submitted successfully!");
                return responseMap;
            }else
            if(statusCode==401){
                responseMap.addAttribute("statusCode", "401");
                responseMap.addAttribute("message","This application is previously submitted and is not in terminal state.");
                return responseMap;
            }else
            if(statusCode==402){
                responseMap.addAttribute("statusCode", "402");
                responseMap.addAttribute("message","You cannot have more than five pending applications.");
                return responseMap;
            }
            else {
                responseMap.addAttribute("statusCode", "404");
                responseMap.addAttribute("message","Snap! Something went wrong. Please try again later.");
                return responseMap;
            }

        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "405");
            return responseMap;
        }
    }

    @CrossOrigin
    @GetMapping(value = "/allJobs")
    public  ModelMap  getOpenings(HttpSession session, Pageable pageable){
        ModelMap responseMap = new ModelMap();
        try {
            if(session.getAttribute("email")==null) {
                System.out.println(" Please login first");
                return null;
            }
            Page<Opening> openings = applicantService.getOpenings(pageable);
            if(openings!=null){
                List<Opening> openingsList=new ArrayList<>();
                List<String> imageURLs=new ArrayList<>();
                for(Opening o : openings){
                    boolean ignore=false;
                    for(Application application:o.getApplications()){
                        if(application.getApplicant().getEmail().equalsIgnoreCase(session.getAttribute("email").toString())){
                            ignore=true;
                            break;
                        }
                    }
                    if(!ignore && o.getStatus()== Opening.Status.OPEN)
                        openingsList.add(o);
//                    imageURLs.add(o.getCompany().getImageUrl());
                }

                responseMap.addAttribute("openings",openingsList);
                responseMap.addAttribute("imageURLs",imageURLs);
                responseMap.addAttribute("message","Search Results-");
                responseMap.addAttribute("status","200");
                return responseMap;
            }else{
                responseMap.addAttribute("message","No Jobs Currently Available");
                responseMap.addAttribute("status","404");
                return responseMap;
            }
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            responseMap.addAttribute("status","404");
            return responseMap;
        }
    }

    @CrossOrigin
    @GetMapping(value = "/activeSession")
    @ResponseBody
    public ModelMap activeSession(HttpSession session){
        ModelMap responseMap = new ModelMap();
        if(session.getAttribute("email")!=null){
            try {
                System.out.println("Email for session in company :"+session.getAttribute("email").toString());
                Applicant applicant=applicantService.fetch(session.getAttribute("email").toString());
                if(applicant==null){
                    responseMap.addAttribute("statusCode","404");
                    return responseMap;
                }
                responseMap.addAttribute("statusCode","200");

            } catch (Exception e) {
                e.printStackTrace();
                responseMap.addAttribute("statusCode","404");
            }
            return responseMap;
        }
        else{
            responseMap.addAttribute("statusCode","404");
            return responseMap;
        }
    }

    @CrossOrigin
    @GetMapping(value = "/search")
    @ResponseBody
    public ModelMap search(@RequestParam(value= "query") String query, HttpSession session, Pageable pageable) {
        ModelMap responseMap = new ModelMap();
        try {
            if (session.getAttribute("email") == null) {
                responseMap.addAttribute("statusCode","404");
                responseMap.addAttribute("message","Please login to search");
                return responseMap;
            }
            Page<Opening> openings=openingService.searchOpenings(query,pageable);

            if(openings!=null){

                List<Opening> openingsList=new ArrayList<>();
                List<String> imageURLs=new ArrayList<>();
                for(Opening o : openings){
//                    imageMap.put(o,o.getCompany().getImageUrl());
                    openingsList.add(o);
//                    imageURLs.add(o.getCompany().getImageUrl());
                }

                responseMap.addAttribute("openings",openingsList);
                responseMap.addAttribute("imageURLs",imageURLs);
                responseMap.addAttribute("message","Search Results-");
                responseMap.addAttribute("statusCode","200");
                return responseMap;
            }
            else{
                responseMap.addAttribute("message","Your search returned no results");
                responseMap.addAttribute("status","404");
                return responseMap;
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            responseMap.addAttribute("status","404");
            return responseMap;
        }
    }

//    @GetMapping(value = "/searchWithFilter")
//    @ResponseBody
//    public ModelMap searchWithFilter(@RequestParam(value = "query") String query,
//                                     @RequestParam(value = "keywords") Set<String> keywords,
//                                     @RequestParam(value="companies")Set<String> companyNames,
//                                     @RequestParam(value = "locations")Set<String> locationNames ,
//                                     @RequestParam(value = "minSalary") String minSal,
//                                     @RequestParam(value = "maxSalary") String maxSal,
//                                     HttpSession session,
//                                     Pageable pageable){
//        ModelMap responseMap = new ModelMap();
//        try {
//
//            if (session.getAttribute("email") == null) {
//                responseMap.addAttribute("statusCode","404");
//                responseMap.addAttribute("message","Please login to search");
//                return responseMap;
//            }
//
//            Integer minSalary=null,maxSalary=null;
//            System.out.println("minsal length :"+minSal.length()+" maxsal length :"+maxSal.length());
//            if(!minSal.equals("undefined") && minSal.length()!=0)
//                minSalary= Integer.parseInt(minSal);
//            if(!maxSal.equals("undefined") && maxSal.length()!=0)
//                maxSalary=Integer.parseInt(maxSal);
//
//            Page<Opening> openings=openingService.searchOpeningsWithFilters(query,keywords,companyNames,locationNames,minSalary,maxSalary,pageable);
//
//            if(openings!=null){
//                List<Opening> openingsList=new ArrayList<>();
//                List<String> imageURLs=new ArrayList<>();
//                for(Opening o : openings){
////                    imageMap.put(o,o.getCompany().getImageUrl());
//                    openingsList.add(o);
////                    imageURLs.add(o.getCompany().getImageUrl());
//                }
//
//                responseMap.addAttribute("openings",openingsList);
//                responseMap.addAttribute("imageURLs",imageURLs);
//                responseMap.addAttribute("message","Search Results-");
//                responseMap.addAttribute("statusCode","200");
//                return responseMap;
//            }
//            else{
//                responseMap.addAttribute("message","Your search returned no results");
//                responseMap.addAttribute("statusCode","405");
//                return responseMap;
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
//            responseMap.addAttribute("statusCode","404");
//            return responseMap;
//        }
//
//    }

    @CrossOrigin
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
//                if(!applicant.isVerified()){
//                    responseMap.addAttribute("statusCode", "400");
//                    responseMap.addAttribute("message", "Please verify your account before signing in.");
//                    return responseMap;
//                }
                if(session.getAttribute("email")!=null){
                    responseMap.addAttribute("statusCode", "400");
                    responseMap.addAttribute("message", "You are already signed in");
                    return responseMap;
                }
                session.setAttribute("email",applicant.getEmail());
                responseMap.addAttribute("statusCode", "200");
                responseMap.addAttribute("applicant",applicant);
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
    @CrossOrigin
    public ModelMap logout(HttpSession session){
        session.invalidate();
        ModelMap responseMap = new ModelMap();
        responseMap.addAttribute("statusCode", "200");
        return responseMap;
    }

}
