package com.scmc.api.member.user.service;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;

public interface AuthService {

	String generateToken(String userId);
	TbMemberCargoOwner insertAndGetUser(JSONObject user);
	Map<String, Object> adminLogin(HashMap<String, Object> obj);
}
