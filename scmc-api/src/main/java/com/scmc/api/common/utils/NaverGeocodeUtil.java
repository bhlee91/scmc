package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NaverGeocodeUtil {
	
	private final APIUtil apiUtil;
	
	@Value("${naver.geocode.key-id}")
	private String KEY_ID;
	
	@Value("${naver.geocode.key}")
	private String KEY;
	
	@Value("${naver.geocode.api}")
	private String API;
	
	public String getAddress(HttpServletRequest request, String query) throws UnsupportedEncodingException {
		String url = API + String.format("?query=%s", URLEncoder.encode(query, "utf-8"));
		
		HttpURLConnection con = apiUtil.connect(url);
		
		try {
			con.setRequestMethod("GET");
			con.setRequestProperty("Content-Type", "application/json");
			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", KEY_ID);
			con.setRequestProperty("X-NCP-APIGW-API-KEY", KEY);
			
			con.connect();
			
			int responseCode = con.getResponseCode();
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				String result = apiUtil.readBody(con.getInputStream());
				
				return result;
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
		
		return null;
	}
}
