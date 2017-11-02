package com.OpportunityHack2018.tbp.repositories;

import com.OpportunityHack2018.tbp.entities.Opening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

/**
 * Created by Vivek Agarwal on 5/12/2017.
 */
@Transactional
public interface OpeningRepository extends JpaRepository<Opening,Integer> {
    @Query(value = "select * from opening where company_email = ?1", nativeQuery = true)
    Set<Opening> findByEmail(String email);

    @Query(value = "delete from opening where email = ?1%", nativeQuery = true)
    void flushOpeningsForCompany(String email);

    @Query(value = "select * from opening where opening_id=?1% and company_email=?2%", nativeQuery = true)
    Opening findByIdAndCompany(int opening_id, String email);

//    @Query(value ="Select o.* " +
//            "from jobportaldb.opening o " +
//            "inner join jobportaldb.company c on o.company_email = c.email " +
//            "where Concat(o.description,'',o.location,'',o.responsibilities,'',o.title,'',c.name) like %?1% ",nativeQuery = true)
//    List<Opening> getSearchResults( String word);

    @Query("Select o " +
            "from Opening o " +
            "inner join o.company c  " +
            "where Concat(o.description,'',o.location,'',o.responsibilities,'',o.title,'',c.name) like %?1%")
    List<Opening> getSearchResults(String word);

    @Query(value = "select * from Opening where Opening.title like ?1%", nativeQuery = true)
    Set<Opening> findByTitle(String title);

    @Query(value = "select * from Opening where Opening.location like ?1%",nativeQuery = true)
    Set<Opening> findByLocation(String location);

    @Query(value = "select o.* from opening o inner join company c on o.company_email=c.email where c.name like  ?1%",nativeQuery = true)
    Set<Opening> findByComapnyName(String name);

    @Query(value = "select * from opening o where o.shift like ?1%",nativeQuery = true)
    Set<Opening> findByShift(String shift);

    @Query(value = "select o.* from opening o inner join application a where o.opening_id=a.opening_id and a.email=?1",nativeQuery = true)
    List<Opening> findAppliedOpenings(String email);
}