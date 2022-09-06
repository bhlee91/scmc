package com.scmc.api.jpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;

@Repository
public interface TbMemberCargoOwnerRepository extends JpaRepository<TbMemberCargoOwner, String> {
	
	TbMemberCargoOwner findByUserId(String userId);
	
	boolean existsByUserId(String userId);
	boolean existsByUserIdAndPhoneNumber(String userId, String phoneNumber);
}
