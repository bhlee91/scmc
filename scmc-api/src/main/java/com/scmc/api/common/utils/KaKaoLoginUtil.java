package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

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
	
	@Value("${spring.host.url-dev}")
	private String DEV_URL;
	
	private String URI = "/LogIn/kid";
	
	public String authConnect(HttpServletRequest request) throws UnsupportedEncodingException {
		
		String auth_url = AUTH_API + String.format("?client_id=%s"
				+ "&redirect_uri=%s"
				+ "&response_type=code"
				, REST_API_KEY, getRedirectURI(request));
		
		return auth_url;
	}
	
	public HashMap<String, Object> getKaKaoToken(HttpServletRequest request, String code) {
		String token_url = TOKEN_API + String.format("?grant_type=authorization_code"
				+ "&client_id=%s"
				+ "&redirect_uri=%s"
				+ "&code=%s"
				, REST_API_KEY, getRedirectURI(request));
		
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
	
	public HashMap<String, Object> refreshToken(HttpServletRequest request, HashMap<String, Object> obj) {
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
	
	private String getRedirectURI(HttpServletRequest request) {
		String redirectUri = "";
		String requestURL = request.getRequestURL().toString();
		
		if (requestURL.contains(DEV_URL)) {
			redirectUri = DEV_URL + ":3006";
		} else if (requestURL.contains("127.0.0.1") || requestURL.contains("localhost")) {
			redirectUri = "localhost:3000";
		}
		
		redirectUri = "http://" + redirectUri + URI;
		
		return redirectUri; 
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
