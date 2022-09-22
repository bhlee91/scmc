package com.scmc.api.member.admin.service;

import java.util.HashMap;

import com.scmc.api.member.admin.dto.LogInDto;
import com.scmc.api.member.admin.dto.SignUpDto;

public interface AdminService {
	
	HashMap<String, Object> login(LogInDto dto);
	HashMap<String, Object> signup(SignUpDto dto);
}
