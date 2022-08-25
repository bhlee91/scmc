package com.scmc.api.member.user.service;

public interface AuthService {

	String generateToken(String userId);
}
