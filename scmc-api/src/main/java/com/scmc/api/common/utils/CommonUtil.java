package com.scmc.api.common.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map.Entry;

import org.json.JSONObject;

public class CommonUtil {
	
	// 현재시간 받아오기
	// 년-월-일 시:분:초
	public static String getNowDate() {
		Date today = new Date();
		Locale currentLocale = new Locale("KOREAN", "KOREA");
		String pattern = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat format = new SimpleDateFormat(pattern, currentLocale);
		
		return format.format(today);
	}
	
	// LinkedHashMap : 삽입 순서 보장 map
	// map -> json string 변환
	public static String getJsonToStringFromMap(LinkedHashMap<String, String> map) {
		JSONObject json = new JSONObject();
		
		for (Entry<String, String> entry : map.entrySet()) {
			json.put(entry.getKey(), entry.getValue());
		}
		
		return json.toString();
	}
}
