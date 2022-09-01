package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbMemberCargoOwner;
import com.scmc.api.member.user.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NaverLoginUtil {
	
	private final APIUtil apiUtil;
	private final AuthService authService;
	private final AuthenticationManager authenticationManager;
	
	@Value("${social.naver.client-id}")
	private String CLIENT_ID;
	
	@Value("${social.naver.client-secret}")
	private String CLIENT_SECRET;
	
	@Value("${social.naver.api.auth}")
	private String AUTH_API;
	
	@Value("${social.naver.api.token}")
	private String TOKEN_API;
	
	@Value("${social.naver.api.profile}")
	private String PROFILE_API;
	
	private final String REDIRECT_URL = "http://localhost:3000/LogIn/nid";
	
	private String generateState(HttpServletRequest request) {
		SecureRandom random = new SecureRandom();
		
		String state = new BigInteger(130, random).toString(32);
		
		request.getSession().setAttribute("state", state);
		
		return state;
	}
	
	public String authConnect(HttpServletRequest request) throws UnsupportedEncodingException {
		
		String auth_url = AUTH_API + String.format("?response_type=code"
				+ "&client_id=%s"
				+ "&redirect_uri=%s"
				+ "&state=%s"
				, CLIENT_ID, URLEncoder.encode(REDIRECT_URL, "UTF-8"), generateState(request));
		
		return auth_url;
	}
	
	public HashMap<String, Object> getNaverToken(HttpServletRequest request, HashMap<String, Object> param) throws UnsupportedEncodingException {
		String token_url = TOKEN_API + String.format("?grant_type=authorization_code"
				+ "&client_id=%s"
				+ "&client_secret=%s"
				+ "&code=%s"
				, CLIENT_ID, CLIENT_SECRET, param.get("code"));
		
		HttpURLConnection con = apiUtil.connect(token_url);

		HashMap<String, Object> res = new HashMap<String, Object>();
		
		try {
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				String socialToken = apiUtil.readBody(con.getInputStream());
				
				res.put("socialToken", socialToken);
				
				TbMemberCargoOwner user = this.getProfile(socialToken);
				
//				authenticationManager.authenticate(
//						new UsernamePasswordAuthenticationToken(user.getUserId(), "1234"));
				
				res.put("profile", user);
				res.put("token", authService.generateToken(user.getUserId()));
				
				return res;
			} else {
				res.put("error", apiUtil.readBody(con.getErrorStream()));
			}
			
			return res;
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}
	
	public HashMap<String, Object> refreshToken(HashMap<String, Object> obj) {
		String token_url = TOKEN_API + String.format("?grant_type=refresh_token"
				+ "&client_id=%s"
				+ "&client_secret=%s"
				+ "&refresh_token=%s"
				, CLIENT_ID, CLIENT_SECRET, obj.get("refresh_token"));
		
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
				
				json = new JSONObject(profile).getJSONObject("response");
				json = json.put("social", "NAVER");

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
