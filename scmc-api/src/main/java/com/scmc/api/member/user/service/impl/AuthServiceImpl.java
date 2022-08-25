package com.scmc.api.member.user.service.impl;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.scmc.api.common.jwt.JwtTokenProvider;
import com.scmc.api.member.user.domain.User;
import com.scmc.api.member.user.repository.UserRepository;
import com.scmc.api.member.user.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final UserRepository userRepository;
	
	private final JwtTokenProvider jwtTokenProvider;
	
	@Override
	public String generateToken(String userId) {
		User user = userRepository.findByUserId(userId);
		
		HashMap<String, Object> info = new HashMap<String, Object>();
		info.put("userId", user.getUserId());
		info.put("role", "ROLE_USER");
		
		String jwt = jwtTokenProvider.createToken(info);
		
		return jwt;
	}
}
