package com.OpportunityHack2018.tbp.aspect;

import com.OpportunityHack2018.tbp.entities.Application;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * Created by Vivek Agarwal on 5/9/2017.
 */

@Aspect
@Component
public class ApplicantServiceAspect {

    @Autowired
    JavaMailSender mailSender;

    @AfterReturning(value = "execution(* com.OpportunityHack2018.tbp.services.ApplicationService.rejectCandidate(com.OpportunityHack2018.tbp.entities.Application)) && args(application)",returning = "result")
    public void sendRejectCandidateUpdate(boolean result, Application application){
        System.out.println("Result for reject candidate :"+result);
        if(result){
            SimpleMailMessage mailMessage=new SimpleMailMessage();
            mailMessage.setTo(application.getApplicant().getEmail());
            mailMessage.setSubject("Application status update");

            mailMessage.setText("Your following application's status has been changed--" +
                    "\n\nBefore :PENDING" +
                    "\n\nNow :REJECTED" +
                    "\n\nApplication ID :"+application.getApplication_id()+
                    "\n\nStatus :"+application.getStatus()+
                    "\n\nTitle :"+application.getOpening().getTitle());

            try {
                mailSender.send(mailMessage);
                System.out.println("Email sent successfully");
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
    }


    @AfterReturning(value = "execution(* com.OpportunityHack2018.tbp.services.ApplicationService.acceptCandidate(com.OpportunityHack2018.tbp.entities.Application)) && args(application)",returning = "result")
    public void sendAcceptCandidateUpdate(boolean result, Application application){
        System.out.println("Result for acccept candidate :"+result);
        if(result){
            SimpleMailMessage mailMessage=new SimpleMailMessage();
            mailMessage.setTo(application.getApplicant().getEmail());
            mailMessage.setSubject("Application status update");

            mailMessage.setText("Congratulations! Your profile has been liked by a company for the following opening you have applied."+
                    "\n\nApplication ID :"+application.getApplication_id()+
                            "\n\n Title :"+application.getOpening().getTitle()+
                    "\n\n Job ID :"+application.getOpening().getOpening_id()+
                    "\n\n Company :"+application.getOpening().getCompany().getName());

            try {
                mailSender.send(mailMessage);
                System.out.println("Email sent successfully");
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
    }

}
