package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KaKaoLoginUtil {
	
	private final APIUtil apiUtil;

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
				res.put("token", apiUtil.readBody(con.getInputStream()));
				
				HashMap<String, Object> profile = this.getProfile(res);
				
				if (profile.containsKey("profile")) {
					res.put("profile", profile.get("profile"));
				} else {
					res.put("error_profile", profile.get("error_profile"));
				}
				
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
	
	private HashMap<String, Object> getProfile(HashMap<String, Object> data) {
		HttpURLConnection con = apiUtil.connect(PROFILE_API);

		HashMap<String, Object> res = new HashMap<String, Object>();
		
		try {
			JSONObject json = new JSONObject(data.get("token").toString());
			
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "Bearer " + json.get("access_token"));
			
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) 
				res.put("profile", apiUtil.readBody(con.getInputStream()));
			else 
				res.put("error_profile", apiUtil.readBody(con.getErrorStream()));
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
		
		return res;
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
				res.put("token", apiUtil.readBody(con.getInputStream()));
				
				HashMap<String, Object> profile = this.getProfile(res);
				
				if (profile.containsKey("profile")) {
					res.put("profile", profile.get("profile"));
				} else {
					res.put("error_profile", profile.get("error_profile"));
				}
				
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
}
