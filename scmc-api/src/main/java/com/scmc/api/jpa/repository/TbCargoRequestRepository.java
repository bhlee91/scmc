package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoRequest;

@Repository
public interface TbCargoRequestRepository extends JpaRepository<TbCargoRequest, Long>{

//	@Query("select distinct R from TbCargoRequest R left join fetch R.images where R.ownerUid = :ownerUid")
//	List<TbCargoRequest> findAllWithTbCargoImageByOwnerUidUsingFetchJoin(Long ownerUid);
}
