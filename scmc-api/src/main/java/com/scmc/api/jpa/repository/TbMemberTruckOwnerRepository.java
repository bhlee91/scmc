package com.scmc.api.jpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;

@Repository
public interface TbMemberTruckOwnerRepository extends JpaRepository<TbMemberTruckOwner, Long> {

	List<TbMemberTruckOwner> findWithTbCargoHistUsingFetchJoinByTruckownerUid(Long truckownerUid);

	TbMemberTruckOwner findByTruckownerUid(Long truckownerUid);
	
	TbMemberTruckOwner findByTruckownerUid(int truckownerUid);
	
	Optional<TbMemberTruckOwner> findByCarNumber(String carNumber);
	
	TbMemberTruckOwner findByPhoneNumber(String phoneNumber);
}
