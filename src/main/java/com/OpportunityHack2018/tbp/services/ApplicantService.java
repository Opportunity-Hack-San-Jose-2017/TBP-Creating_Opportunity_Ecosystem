package com.OpportunityHack2018.tbp.services;

import com.OpportunityHack2018.tbp.entities.Applicant;
import com.OpportunityHack2018.tbp.entities.Application;
import com.OpportunityHack2018.tbp.entities.Opening;
import com.OpportunityHack2018.tbp.repositories.ApplicantRepository;
import com.OpportunityHack2018.tbp.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Created by Vivek Agarwal on 5/9/2017.
 */
@Service
public class ApplicantService {
    @Autowired
    ApplicantRepository applicantRepository;
    @Autowired
    CompanyRepository companyRepository;
    @Autowired
    OpeningService openingService;
    @Autowired
    ApplicationService applicationService;


    public boolean register(Applicant applicant) throws Exception {
        if(companyRepository.findOne(applicant.getEmail())==null && applicantRepository.findOne(applicant.getEmail())==null)
        {
            MessageDigest md = MessageDigest.getInstance("MD5");
            String keyGen=applicant.getEmail()+":"+applicant.getPassword(); // When password is already encrypted, this could get buggy
            md.update(keyGen.getBytes());
            byte[] digest=md.digest();
            String hashValue= DatatypeConverter.printHexBinary(digest).toUpperCase();
            applicant.setHashValue(hashValue);
            applicantRepository.save(applicant);
            return true;
        }
        else return false;
    }


    public Applicant fetch(String email) throws Exception{
        return applicantRepository.findOne(email);
    }

    public Page<Opening> getOpenings(Pageable pageable) throws Exception{
        Page<Opening> openings=openingService.getAllOpenings(pageable);
        return openings;
    }

    public int applyWithResume(String resumeUrl, int opening_id, String applicant_id) {
        Application application=new Application();
        Opening opening=null;

        try{
            opening=openingService.getOpening(opening_id);
            if(opening==null)
                return 404;
        }
        catch (Exception e){
            e.printStackTrace();
            return 404;
        }

        Applicant applicant=applicantRepository.findOne(applicant_id);
        Set<Application> applications=applicant.getApplications();

        for(Application submittedApplication:applications){
            if(submittedApplication.getOpening().getOpening_id()==opening_id){
                if(!submittedApplication.isTerminal())
                    return 401;
            }
        }

        if(applicant.getPendingApplications()>4)
            return 402;

        application.setApplicant(applicant);
        application.setOpening(opening);
        application.setStatus("Pending");
        application.setResumeUrl(resumeUrl);

        try {
            applicationService.save(application);
            applicant.setPendingApplications(applicant.getPendingApplications()+1);
        }
        catch (Exception e){
            e.printStackTrace();
            return 404;
        }
        return 200;
    }

    public int apply(int jobId,String applicantId) throws Exception {
        Application application=new Application();
        Opening opening=null;
        try {
            opening = openingService.getOpening(jobId);
        }
        catch (Exception e){
            e.printStackTrace();
            return 404;
        }
        Applicant applicant=applicantRepository.findOne(applicantId);
        Set<Application> applications=applicant.getApplications();

        for(Application submittedApplication:applications){
            if(submittedApplication.getOpening().getOpening_id()==jobId){
                if(!submittedApplication.isTerminal())
                    return 401;
            }
        }

//        if(applicant.getPendingApplications()>4)
//            return 402;
        application.setApplicant(applicant);
        application.setOpening(opening);
        application.setStatus("Pending");
        application.setDate(new Date());

        try {
            applicationService.save(application);
            applicant.setPendingApplications(applicant.getPendingApplications()+1);
        }
        catch (Exception e){
            e.printStackTrace();
            return 404;
        }
        return 200;
    }

    public boolean reducePendingApplication(String email) {
        try {
            Applicant applicant = applicantRepository.findOne(email);
            applicant.setPendingApplications(applicant.getPendingApplications()-1);
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    public Applicant getApplicantWithHashValue(String hashValue) throws Exception{
        return applicantRepository.findByHashValue(hashValue);
    }

    public void save(Applicant applicant) throws Exception {
        applicantRepository.save(applicant);
    }


    public List<Applicant> searchApplicants(String min_ratings, Integer min_experience, Set<String> skills, Set<String> positions, String availability, String education, String city, String country, String language) {
        List<Applicant> candidates=applicantRepository.searchCandidates(""+min_experience,min_ratings);
        List<Applicant> qualified=new ArrayList<>();
        System.out.println("Found search results :"+candidates.size());

        for(Applicant applicant:candidates){
            System.out.println("Applicant Availibility :"+applicant.getAvailability());
            if(availability!=null && availability.length()>0){
                if(!applicant.getAvailability().contains(availability)) continue;
            }

            System.out.println("Availibility passed ");

            if(education!=null && education.length()>0){
                if(!education.trim().toLowerCase().contains(applicant.getEducation().toLowerCase())) continue;
            }

            System.out.println("education passed ");

            if(city!=null && city.length()>0){
                if(!city.trim().equalsIgnoreCase(applicant.getCity())) continue;
            }

            System.out.println("City passed ");

            if(country!=null && country.length()>0){
                if(!country.trim().equalsIgnoreCase(applicant.getCountry())) continue;
            }

            if(language!=null && language.length()>0){
                if(!language.trim().equalsIgnoreCase(applicant.getLanguage())) continue;
            }

            System.out.println("Country passed ");
            System.out.println("Skills :"+skills);
            if(skills!=null && skills.size()>0){
                boolean fail=true;
                for(String skill:skills){
                    for(String appSkill:applicant.getSkillsSet())
                        if(appSkill.trim().toLowerCase().contains(skill)){
                            fail=false;
                            break;
                        }
                }
                if(fail) continue;
            }

            System.out.println("Skills passed ");
            if(positions!=null && positions.size()>0){
                boolean fail=true;
                for(String position:positions){
                    if(applicant.getPosition().trim().equalsIgnoreCase(position)) {
                        fail = false;
                        break;
                    }
                }
                if(fail) continue;
            }
            System.out.println("positions passed ");
            qualified.add(applicant);
        }

        return qualified;
    }

    public List<Opening> getAppliedOpenings(String email) {
        return openingService.getAppliedOpenings(email);
    }
}
