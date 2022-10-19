package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NaverGeoUtil {

	private final APIUtil apiUtil;
	
	@Value("${api.naver.geo.key-id}")
	private String REST_API_KEY;
	
	@Value("${api.naver.geo.key-secret}")
	private String REST_API_SECRET;
	
	@Value("${api.naver.geo.api.geocode}")
	private String GEO_API;
	
	public JSONObject address2Coord(String query) throws UnsupportedEncodingException {
		String api_url = String.format(GEO_API + "?query=%s", query);
		log.info("api_url => " + api_url);
		HttpURLConnection con = apiUtil.connect(api_url);
		JSONObject responseJson = null;
		
		try {
			con.setRequestMethod("GET");
			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", REST_API_KEY);
			con.setRequestProperty("X-NCP-APIGW-API-KEY", REST_API_SECRET);
			
			con.setDoOutput(true);

			int responseCode = con.getResponseCode();
			log.info("response code => " + responseCode);
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
