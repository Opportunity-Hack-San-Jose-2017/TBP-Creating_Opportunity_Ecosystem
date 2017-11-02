package com.OpportunityHack2018.tbp.controllers;

import com.OpportunityHack2018.tbp.entities.*;
import com.OpportunityHack2018.tbp.services.ApplicantService;
import com.OpportunityHack2018.tbp.services.ApplicationService;
import com.OpportunityHack2018.tbp.services.CompanyService;
import com.OpportunityHack2018.tbp.services.OpeningService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.*;


@RestController
@RequestMapping(value = "/company")
@CrossOrigin
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

        System.out.println("Session in profile :"+session.getId());
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
        System.out.println("Session in profile :"+session.getId());
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

            if(company.getEmail()==null || company.getPassword()==null || company.getName()==null){
                responseMap.addAttribute("statusCode",403);
                responseMap.addAttribute("message","Invalid registration form fields. Check email, password and name");
                return responseMap;
            }
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
        System.out.println("Session in sign :"+session.getId());
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

    @CrossOrigin
    @PostMapping(value = "/logout")
    @ResponseBody
    public ModelMap logout(HttpSession session){
        System.out.println("Session id:"+ session.getId());
        session.invalidate();
        ModelMap responseMap = new ModelMap();
        responseMap.addAttribute("statusCode", "200");
        return responseMap;
    }

    @GetMapping(value = "/allOpenings")
    @ResponseBody
    @CrossOrigin
    public ModelMap getOpenings(HttpSession session){
        ModelMap responseMap = new ModelMap();
        if(session.getAttribute("email")==null) {
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Please login to continue");
            return responseMap;
        }

        try {
            Set<Opening> openings = companyService.getAllOpenings(session.getAttribute("email").toString());
            List<ModelMap> openingMap = new ArrayList<ModelMap>();
            for(Opening o : openings){
                ModelMap m = new ModelMap();
                m.addAttribute("title", o.getTitle());
                m.addAttribute("location", o.getLocation());
                m.addAttribute("description", o.getDescription());
                m.addAttribute("responsibility", o.getResponsibilities());
                m.addAttribute("companyName", o.getCompany().getName());
                m.addAttribute("date", o.getDate());
                m.addAttribute("id", o.getOpening_id());
//                m.addAttribute("imageUrl",o.getCompany().getImageUrl());
                m.addAttribute("openingStatus",o.getStatus());
                m.addAttribute("minSalary",o.getMinSalary());
                m.addAttribute("maxSalary",o.getMaxSalary());
                openingMap.add(m);
            }
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute(openingMap);

        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "400");
            responseMap.addAttribute("message", "Snap! Something went wrong please try again later");
            return responseMap;
        }
        return responseMap;
    }

    @GetMapping(value = "/opening")
    @ResponseBody
    @CrossOrigin
    public ModelMap getOpening(@RequestParam ("opening_id") Integer opening_id,HttpSession session){
        ModelMap responseMap = new ModelMap();
        System.out.println("Opening id:"+opening_id);
        if(session.getAttribute("email")==null || opening_id==null){
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message","Please sign in before fetching opening and provide job id.");
        }

        try {
            Opening opening=openingService.getOpening(opening_id);
            responseMap.addAttribute("title",opening.getTitle());
            responseMap.addAttribute("description",opening.getDescription());
            responseMap.addAttribute("date",opening.getDate());
            responseMap.addAttribute("location",opening.getLocation());
            responseMap.addAttribute("responsibilites",opening.getResponsibilities());
            responseMap.addAttribute("minSalary",opening.getMinSalary());
            responseMap.addAttribute("maxSalary",opening.getMaxSalary());
            responseMap.addAttribute("applications",opening.getApplications());
//            responseMap.addAttribute("imageUrl",opening.getCompany().getImageUrl());
            responseMap.addAttribute("openingStatus",opening.getStatus());


            List<ModelMap> app_list = new ArrayList<>();
            HashMap<String,String> mapofapp = new HashMap<String,String>();
            for(int i=0;i<opening.getApplications().size();i++){
                ModelMap m = new ModelMap();
                System.out.println("Email:"+opening.getApplications().get(i).getApplicant().getEmail());
                System.out.println("Error:");
                m.addAttribute("applicantInfo",opening.getApplications().get(i).getApplicant());
                m.addAttribute("applicationStatuscustom",opening.getApplications().get(i).getStatus());
                m.addAttribute("applicantResume",opening.getApplications().get(i).getResumeUrl());
                m.addAttribute("applicationId",opening.getApplications().get(i).getApplication_id());
                app_list.add(m);
                mapofapp.put(opening.getApplications().get(i).getApplicant().getEmail(),opening.getApplications().get(i).getStatus());

            }

            responseMap.addAttribute("applicantsInfo",app_list);



            responseMap.addAttribute("applicationscustom",mapofapp);
            responseMap.addAttribute("company",opening.getCompany().getName());
            responseMap.addAttribute("statusCode","200");
            return responseMap;
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode","500");
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            return responseMap;
        }
    }


    @PostMapping(value = "/cancelOpening")
    @ResponseBody
    @CrossOrigin
    public ModelMap cancelOpening(@RequestBody String jsonObj,HttpSession session) {
        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        if (session.getAttribute("email") == null) {
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message", "Please sign in before updating opening.");
        }

        try {
            JSONObject obj = new JSONObject(jsonObj);
            int openingId = obj.getInt("openingId");
            Opening opening = openingService.getOpeningForCompany(openingId, session.getAttribute("email").toString());
            /*Opening openingReqObj = mapper.readValue(jsonObj, Opening.class);
            Opening opening = openingService.getOpeningForCompany(openingReqObj.getOpening_id(), session.getAttribute("email").toString());*/
            List<Application> applications=opening.getApplications();
            for(Application application:applications){
                if(application.getStatus().equals("OfferAccepted")){
                    responseMap.addAttribute("statusCode", "401");
                    responseMap.addAttribute("message","Cannot cancel this position! An offer for this opening is already accepted.");
                    return responseMap;
                }
            }
            for(Application application:applications){
                if(!application.isTerminal() && !applicationService.cancelApplication(application)){
                    System.out.println("The application :"+application.getApplication_id()+" is already in terminal state. But leaving it as is.");
                }
            }

            openingService.cancelOpening(opening);
            responseMap.addAttribute("statusCode", "200");
            responseMap.addAttribute("message","Opening canceled successfully!");
            return responseMap;
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            return responseMap;
        }
    }

    @PostMapping(value = "/updateOpening")
    @ResponseBody
    @CrossOrigin
    public ModelMap updateOpening(@RequestBody String jsonObj,HttpSession session){

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        if(session.getAttribute("email")==null){
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message","Please sign in before updating opening.");
        }

        try {
            Opening openingReqObj = mapper.readValue(jsonObj, Opening.class);
            Opening opening=openingService.getOpeningForCompany(openingReqObj.getOpening_id(),session.getAttribute("email").toString());
            if(companyService.updateOpening(openingReqObj,opening)) {

                responseMap.addAttribute("statusCode", "200");
                responseMap.addAttribute("message", "Opening updated successfully!");
            }else {
                responseMap.addAttribute("statusCode","500");
                responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode","500");
            responseMap.addAttribute("message","Snap! Something went wrong. Please try again.");
        }
        return responseMap;
    }

    @GetMapping(value="/interview")
    @ResponseBody
    @CrossOrigin
    public ModelMap getInterviews(@RequestParam ("opening_id") Integer opening_id, HttpSession session){

        System.out.println("Opening id:"+opening_id);

        ModelMap responseMap = new ModelMap();

        if (session.getAttribute("email") == null) {
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message", "Please sign in before updating opening.");
        }

        try {


            Opening opening=openingService.getOpening(opening_id);
            if(opening==null){
                responseMap.addAttribute("statusCode","404");
                responseMap.addAttribute("message","Opening not found.");
                return responseMap;
            }
            List<Application> applications=opening.getApplications();
            List<InterviewSchedule> currentInterviews=new ArrayList<>();
            List<String> emails=new ArrayList<>();
            for(Application application:applications){
                if(application.getInterviewSchedule()!=null) {
                    currentInterviews.add(application.getInterviewSchedule());
                    emails.add(application.getApplicant().getEmail());
                }
            }
            responseMap.addAttribute("statusCode", "200");
            responseMap.addAttribute("message", "Scheduled interviews found successfully");
            responseMap.addAttribute("email",emails);
            responseMap.addAttribute("ScheduledInterviews",currentInterviews);
        }
        catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode", "404");
            responseMap.addAttribute("message", "Snap! Something went wrong. Please try again.");
        }
        return responseMap;
    }

    @PostMapping(value = "/interview")
    @ResponseBody
    @CrossOrigin
    public ModelMap scheduleInterview(@RequestBody String jsonObj,HttpSession session) {

        ObjectMapper mapper = new ObjectMapper();
        ModelMap responseMap = new ModelMap();

        JSONObject obj = new JSONObject(jsonObj);

        int application_id = obj.getInt("application_id");
        String startDate = obj.getString("startTime");
        String endDate = obj.getString("endTime");

        String location = obj.getString("location");
        System.out.println("App id:"+application_id);
        System.out.println("startDate :"+startDate);
        System.out.println("endDate :"+endDate);
        System.out.println("location :"+location);


        if (session.getAttribute("email") == null) {
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message", "Please sign in before updating opening.");
        }

        try {
            Application application=applicationService.getApplication(application_id);
            if(application==null){
                responseMap.addAttribute("statusCode","404");
                responseMap.addAttribute("message","Application not found.");
                return responseMap;
            }
            InterviewSchedule interviewSchedule=new InterviewSchedule();
            interviewSchedule.setStartDate(startDate);
            interviewSchedule.setEndDate(endDate);
            interviewSchedule.setLocation(location);
            interviewSchedule.setScheduled(true);
            application.setInterviewSchedule(interviewSchedule);
            applicationService.save(application);

            //send mail
//            calendarexample.createCalendar(application_id,location,startDate,endDate,application.getApplicant().getEmail());



            responseMap.addAttribute("statusCode","200");
            responseMap.addAttribute("message","Interview Scheduled Successfully!");
            return responseMap;

        } catch (Exception e) {
            e.printStackTrace();
            responseMap.addAttribute("statusCode","404");
            responseMap.addAttribute("message","Snap! Something went wrong.");
            return responseMap;
        }
    }

    @PostMapping(value = "/rejectApplicant")
    @CrossOrigin
    public ModelMap rejectApplicant(@RequestBody String json, HttpSession session){
        ModelMap responseMap = new ModelMap();

        JSONObject obj = new JSONObject(json);
        int applicationId = obj.getInt("applicationId");

        if(session.getAttribute("email")==null) {
            responseMap.addAttribute("statusCode","403");
            responseMap.addAttribute("msg","Please login to continue");
            return responseMap;        }
        try {
            Application application = applicationService.getApplication(applicationId);
            if(applicationService.rejectCandidate(application) && applicantService.reducePendingApplication(application.getApplicant().getEmail())) {
                responseMap.addAttribute("statusCode","200");
                responseMap.addAttribute("msg","Application Rejected Successfully");
                return responseMap;
            }
            responseMap.addAttribute("statusCode","400");
            responseMap.addAttribute("msg","Cannot Reject Applicant");
            return responseMap;        }catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode","400");
            responseMap.addAttribute("msg","Cannot deny application right now. Please try again later");
            return responseMap;
        }
    }

    @PostMapping(value = "/acceptApplicant")
    @CrossOrigin
    public ModelMap acceptApplicant(@RequestBody String json, HttpSession session){
        ModelMap responseMap = new ModelMap();
        JSONObject obj = new JSONObject(json);
        int applicationId = obj.getInt("applicationId");
        if(session.getAttribute("email")==null) {
            responseMap.addAttribute("statusCode","403");
            responseMap.addAttribute("msg","Please login to continue");
            return responseMap;
        }
        try {
            Application application = applicationService.getApplication(applicationId);
            if(applicationService.acceptCandidate(application)) {
                responseMap.addAttribute("statusCode","200");
                responseMap.addAttribute("msg","Offer Made Successfully");
                return responseMap;
            }
            responseMap.addAttribute("statusCode","400");
            responseMap.addAttribute("msg","Cannot Make Offer");
            return responseMap;
        }catch (Exception e){
            e.printStackTrace();
            responseMap.addAttribute("statusCode","400");
            responseMap.addAttribute("msg","Cannot make offer right now. Please try again later");
            return responseMap;
        }
    }

    @GetMapping("/searchApplicants")
    public ModelMap searchApplicants(@RequestParam(value = "min_ratings") String min_ratings,
                                     @RequestParam(value = "skillSets") Set<String> skills,
                                     @RequestParam(value="positions")Set<String> positions,
                                     @RequestParam(value = "min_experience")Integer min_experience ,
                                     @RequestParam(value = "availability") String availability,
                                     @RequestParam(value = "education") String education,
                                     @RequestParam(value = "city") String city,
                                     @RequestParam(value = "country") String country
  ,HttpSession session){
        ModelMap responseMap=new ModelMap();
        List<Applicant> applicantList=null;
        try {
            applicantList = applicantService.searchApplicants(min_ratings, min_experience, skills, positions, availability, education, city, country);
        }
        catch (Exception ex){
            System.out.println(ex);
            responseMap.addAttribute("statusCode",500);
            responseMap.addAttribute("message","Oops! Something went wrong. Please try again.");
            return responseMap;
        }

        responseMap.addAttribute("statusCode",200);
        responseMap.addAttribute("candidates",applicantList);

        return responseMap;
    }

    @PutMapping(value = "/rate")
    @ResponseBody
    @CrossOrigin
    public ModelMap rate(@RequestBody String jsonObj, HttpSession session){
        ModelMap responseMap=new ModelMap();
        if(session.getAttribute("email")==null){
            responseMap.addAttribute("statusCode", "401");
            responseMap.addAttribute("message", "Please sign in to rate.");
            return responseMap;
        }

        JSONObject rateObj=new JSONObject(jsonObj);
        try {
            if (rateObj.get("applicant_email") == null || applicantService.fetch(rateObj.getString("applicant_email")) == null) {
                responseMap.addAttribute("statusCode", "404");
                responseMap.addAttribute("message", "Applicant not found");
                return responseMap;
            }

            Applicant applicant = applicantService.fetch(rateObj.getString("applicant_email"));
            applicant.setRating(rateObj.getInt("rating"));
            applicantService.save(applicant);
        }
        catch (Exception e){
            e.printStackTrace();
        }

        responseMap.addAttribute("statusCode","201");
        return responseMap;
    }




}
