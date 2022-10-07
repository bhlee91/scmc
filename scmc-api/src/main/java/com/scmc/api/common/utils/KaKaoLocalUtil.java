package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KaKaoLocalUtil {
	
	private final APIUtil apiUtil;

	@Value("${social.kakao.rest-api-key}")
	private String REST_API_KEY;
	
	@Value("${social.kakao.api.local}")
	private String LOCAL_API;
	
	public String searchAddress(String query) throws UnsupportedEncodingException {
		String api_url = String.format(LOCAL_API + "?query=%s", URLEncoder.encode(query, "UTF-8"));
		HttpURLConnection con = apiUtil.connect(api_url);
		String response = "";
		
		try {
			con.setRequestMethod("GET");
			con.setRequestProperty("Authorization", "KakaoAK " + REST_API_KEY);
			con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			
			con.setDoOutput(true);

			int responseCode = con.getResponseCode();

			if (responseCode == HttpURLConnection.HTTP_OK)
				response = apiUtil.readBody(con.getInputStream());
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
		
		return response;
	}
}
