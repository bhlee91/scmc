package com.scmc.api.member.user.service;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;

public interface UserService {
	
	TbMemberCargoOwner findByUserId(String userId);
}
