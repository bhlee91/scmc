package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;
import com.scmc.api.member.user.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KaKaoLoginUtil {
	
	private final APIUtil apiUtil;
	private final AuthService authService;

	@Value("${social.kakao.rest-api-key}")
	private String REST_API_KEY;
	
	@Value("${social.kakao.api.auth}")
	private String AUTH_API;
	
	@Value("${social.kakao.api.token}")
	private String TOKEN_API;
	
	@Value("${social.kakao.api.profile}")
	private String PROFILE_API;
	
	private String REDIRECT_URI = "http://localhost:3000/LogIn/kid";
	
	public String authConnect() throws UnsupportedEncodingException {
		
		String auth_url = AUTH_API + String.format("?client_id=%s"
				+ "&redirect_uri=%s"
				+ "&response_type=code"
				, REST_API_KEY, REDIRECT_URI);
		
		return auth_url;
	}
	
	public HashMap<String, Object> getKaKaoToken(String code) {
		String token_url = TOKEN_API + String.format("?grant_type=authorization_code"
				+ "&client_id=%s"
				+ "&redirect_uri=%s"
				+ "&code=%s"
				, REST_API_KEY, REDIRECT_URI, code);
		
		HttpURLConnection con = apiUtil.connect(token_url);

		HashMap<String, Object> res = new HashMap<String, Object>();
		
		try {
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				String socialToken = apiUtil.readBody(con.getInputStream());
				
				res.put("socialToken", socialToken);
				
				TbMemberCargoOwner user = this.getProfile(socialToken);
				
				res.put("profile", user);
				res.put("token", authService.generateToken(user.getUserId()));
				
				return res;
			} else {
				res.put("error", apiUtil.readBody(con.getErrorStream()));	
				return res;
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}
	
	public HashMap<String, Object> refreshToken(HashMap<String, Object> obj) {
		String token_url = TOKEN_API + String.format("?grant_type=refresh_token"
				+ "&client_id=%s"
				+ "&refresh_token=%s"
				, REST_API_KEY, obj.get("refresh_token"));
		
		HttpURLConnection con = apiUtil.connect(token_url);
		
		HashMap<String, Object> res = new HashMap<String, Object>();
		
		try {
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				String socialToken = apiUtil.readBody(con.getInputStream());
				
				res.put("socialToken", socialToken);
				
				TbMemberCargoOwner user = this.getProfile(socialToken);
				
				res.put("profile", user);
				res.put("token", authService.generateToken(user.getUserId()));
				
				return res;
			} else {
				res.put("error", apiUtil.readBody(con.getErrorStream()));	
				return res;
			}
			
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}
	
	private TbMemberCargoOwner getProfile(String socialToken) {
		HttpURLConnection con = apiUtil.connect(PROFILE_API);
		
		try {
			JSONObject json = new JSONObject(socialToken);
			
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "Bearer " + json.get("access_token"));
			
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				String profile = apiUtil.readBody(con.getInputStream());
				
				json = new JSONObject(profile);
				json = json.put("social", "KAKAO");

				return authService.insertAndGetUser(json);
			}
			else {
				return null;
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}
}
