package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbCargoRequest;

@Repository
public interface TbCargoRequestRepository extends JpaRepository<TbCargoRequest, Long> {
	
	TbCargoRequest findByReqId(Long reqId);
	List<TbCargoRequest> findWithTbCargoImageUsingFetchJoinByOwnerUidOrderByReqIdAsc(Long ownerUid);
	List<TbCargoRequest> findAllByOrderByReqIdAsc();
	
	// admin 용
	int countByStatus(String status);
}
