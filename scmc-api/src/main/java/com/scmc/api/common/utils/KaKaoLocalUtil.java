package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URLEncoder;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class KaKaoLocalUtil {
	
	private final APIUtil apiUtil;

	@Value("${social.kakao.rest-api-key}")
	private String REST_API_KEY;
	
	@Value("${social.kakao.api.local.address}")
	private String ADDRESS_API;
	
	@Value("${social.kakao.api.local.coord2address}")
	private String COORD2ADDRESS_API;
	
	public JSONObject searchAddress(String query) throws UnsupportedEncodingException {
		String api_url = String.format(ADDRESS_API + "?query=%s", URLEncoder.encode(query, "UTF-8"));
		HttpURLConnection con = apiUtil.connect(api_url);
		JSONObject responseJson = null;
		
		try {
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "KakaoAK " + REST_API_KEY);
			con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			
			con.setDoOutput(true);

			int responseCode = con.getResponseCode();
			
			if (responseCode == 400 || responseCode == 401 || responseCode == 500) {
				log.error(responseCode + " Error!");
			} else {
				responseJson = new JSONObject(apiUtil.readBody(con.getInputStream()));
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
		
		return responseJson;
	}
	
	/**
	 * 
	 * @param lat : 위도
	 * @param lon : 경도
	 * @return
	 */
	public JSONObject coord2Address(String lat, String lon) {
		String api_url = String.format(COORD2ADDRESS_API + "?input_coord=WGS84&x=%s&y=%s", lon, lat);
		HttpURLConnection con = apiUtil.connect(api_url);
		JSONObject responseJson = null;
		
		try {
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "KakaoAK " + REST_API_KEY);
			con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			
			con.setDoOutput(true);

			int responseCode = con.getResponseCode();
			
			if (responseCode == 400 || responseCode == 401 || responseCode == 500) {
				log.error(responseCode + " Error!");
			} else {
				responseJson = new JSONObject(apiUtil.readBody(con.getInputStream()));
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
		
		return responseJson;
	}
}
