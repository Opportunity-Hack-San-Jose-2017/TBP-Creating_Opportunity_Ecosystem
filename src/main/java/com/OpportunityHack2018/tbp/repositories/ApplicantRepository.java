package com.OpportunityHack2018.tbp.repositories;

import com.OpportunityHack2018.tbp.entities.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Vivek Agarwal on 5/9/2017.
 */
@Transactional
public interface ApplicantRepository extends JpaRepository<Applicant,String> {
    Applicant findByHashValue(String hashValue);
}
