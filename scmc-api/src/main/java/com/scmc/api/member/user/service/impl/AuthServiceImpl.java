package com.scmc.api.member.user.service.impl;

import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.scmc.api.common.jwt.JwtTokenProvider;
import com.scmc.api.jpa.domain.TbMemberCargoOwner;
import com.scmc.api.jpa.repository.TbMemberCargoOwnerRepository;
import com.scmc.api.member.user.service.AuthService;
import com.scmc.api.member.user.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final TbMemberCargoOwnerRepository tbMemberCargoOwnerRepository;
	
	private final JwtTokenProvider jwtTokenProvider;
	
	private final UserService userService;
	
	@Override
	public String generateToken(String userId) {
		TbMemberCargoOwner user = tbMemberCargoOwnerRepository.findByUserId(userId);
		
		HashMap<String, Object> info = new HashMap<String, Object>();
		info.put("userId", user.getUserId());
		
		String jwt = jwtTokenProvider.createToken(info);
		
		return jwt;
	}

	@Override
	public TbMemberCargoOwner insertAndGetUser(JSONObject json) {
		JSONObject user = new JSONObject();
		
		if (json.getString("social").equals("NAVER")) {
			user.put("userId", json.getString("id"));
			user.put("phoneNumber", json.getString("mobile"));
			user.put("ownerName", json.getString("name"));
		} else if(json.getString("social").equals("KAKAO")) {
			JSONObject account = json.getJSONObject("kakao_account");
			
			user.put("userId", json.get("id").toString());
			if (account.has("phone_number"))
				user.put("phoneNumber", account.getString("phone_number"));
			else 
				user.put("phoneNumber", "");
			user.put("ownerName", account.getJSONObject("profile").getString("nickname"));
		}
		
		TbMemberCargoOwner owner = new TbMemberCargoOwner(user);
		
		if (!tbMemberCargoOwnerRepository.existsByUserId(owner.getUserId()))
			tbMemberCargoOwnerRepository.save(owner);
		
		return userService.findByUserId(owner.getUserId());
	}

	@Override
	public boolean adminLogin(HashMap<String, Object> obj) {
		
		return tbMemberCargoOwnerRepository.existsByUserIdAndPhoneNumber(obj.get("id").toString(), obj.get("password").toString());
	}
}
