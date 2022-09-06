package com.scmc.api.jpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scmc.api.jpa.domain.TbMemberTruckOwner;

public interface TbMemberTruckOwnerRepository extends JpaRepository<TbMemberTruckOwner, Long> {

	List<TbMemberTruckOwner> findWithTbCargoHistUsingFetchJoinByTruckownerUid(Long truckownerUid);

	TbMemberTruckOwner findByTruckownerUid(Long truckownerUid);
}
