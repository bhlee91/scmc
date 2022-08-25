package com.scmc.api.member.user.service;

import com.scmc.api.member.user.domain.User;

public interface UserService {
	
	User findByUserId(String userId);
}
