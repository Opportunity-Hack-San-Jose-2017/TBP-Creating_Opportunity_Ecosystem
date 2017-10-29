package com.OpportunityHack2018.tbp.repositories;

import com.OpportunityHack2018.tbp.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Vivek Agarwal on 5/12/2017.
 */
public interface ApplicationRepository extends JpaRepository<Application,Integer> {
}
