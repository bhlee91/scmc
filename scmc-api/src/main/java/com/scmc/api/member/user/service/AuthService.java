package com.scmc.api.member.user.service;

import org.json.JSONObject;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;

public interface AuthService {

	String generateToken(String userId);
	TbMemberCargoOwner insertAndGetUser(JSONObject user);
}
