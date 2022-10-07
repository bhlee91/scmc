package com.scmc.api.common.utils;

import java.text.ParseException;
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
	
	public static String getFormatDate(Date date) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		return format.format(date);
	}
	
	// String to Date
	public static Date getStringToDate(String dateString) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		return format.parse(dateString);
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
	
	// String type
	// null or 공백 체크
	public static boolean isStringEmpty(String str) {
		return str == null || str.isBlank();
	}
	
	/**
	 * 두 지점 사이의 거리 계산
	 * 
	 * @param lat1 지점 1 위도
	 * @param lon1 지점 1 경도
	 * @param lat2 지점 2 위도
	 * @param lon2 지점 2 경도
	 * @param unit km or m
	 * @return
	 */
	public static double distance(double lat1, double lon1, double lat2, double lon2, String unit) {
		double theta = lon1 - lon2;
		double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
		
		dist = Math.acos(dist);
		dist = rad2deg(dist);
		dist = dist * 60 * 1.1515;
		
		if (unit.equals("km"))
			dist = dist * 1.609344;
		else if (unit.equals("m"))
			dist = dist * 1609.344;
		
		return dist;
	}
	
	private static double deg2rad(double deg) {
		return (deg * Math.PI / 180.0); 
	}
	
	private static double rad2deg(double rad) {
		return (rad * 180 / Math.PI);
	}
}
