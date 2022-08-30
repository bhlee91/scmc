package com.scmc.api.member.user.service.impl;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;
import com.scmc.api.jpa.repository.TbMemberCargoOwnerRepository;
import com.scmc.api.member.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final TbMemberCargoOwnerRepository tbMemberCargoOwnerRepository;
	
	@Override
	public TbMemberCargoOwner findByUserId(String userId) {
		return tbMemberCargoOwnerRepository.findByUserId(userId);
	}

}
