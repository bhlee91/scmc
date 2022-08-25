package com.scmc.api.member.user.service.impl;

import org.springframework.stereotype.Service;

import com.scmc.api.member.user.domain.User;
import com.scmc.api.member.user.repository.UserRepository;
import com.scmc.api.member.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	
	@Override
	public User findByUserId(String userId) {
		return userRepository.findByUserId(userId);
	}

}
