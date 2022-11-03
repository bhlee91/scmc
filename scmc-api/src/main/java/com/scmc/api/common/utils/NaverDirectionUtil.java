package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NaverDirectionUtil {

	private final APIUtil apiUtil;
	
	@Value("${naver.maps.key-id}")
	private String KEY_ID;
	
	@Value("${naver.maps.key}")
	private String KEY;
	
	@Value("${naver.driving.api}")
	private String API;
	
	public String getCoord(String start, String goal, String option) throws UnsupportedEncodingException {
		String url = API + String.format("?start=%s&goal=%s&option=%s&cartype=3&fueltype=diesel", start, goal, option);
		
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
