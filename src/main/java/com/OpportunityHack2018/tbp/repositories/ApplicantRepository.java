package com.OpportunityHack2018.tbp.repositories;

import com.OpportunityHack2018.tbp.entities.Applicant;
import com.amazonaws.services.opsworks.model.App;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Vivek Agarwal on 5/9/2017.
 */
@Transactional
public interface ApplicantRepository extends PagingAndSortingRepository<Applicant,String> {
    Applicant findByHashValue(String hashValue);

    @Query(value = "select * from Applicant where Applicant.experience >= ?1 and Applicant.rating >= ?2", nativeQuery = true)
    public List<Applicant> searchCandidates(String min_experience, String min_ratings);

    public Page<Applicant> findAll(Pageable pageable);

}
