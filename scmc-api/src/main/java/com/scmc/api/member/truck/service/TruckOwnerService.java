package com.scmc.api.member.truck.service;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.scmc.api.common.jwt.TokenDto;
import com.scmc.api.jpa.domain.TbMemberTruckOwner;
import com.scmc.api.jpa.domain.TbSysSmslog;
import com.scmc.api.jpa.domain.TbTruckOwnerCargoInfo;
import com.scmc.api.member.truck.dto.CargoInfoDto;
import com.scmc.api.member.truck.dto.HistoryDto;

public interface TruckOwnerService {

	String insertTruckOwner(HashMap<String, Object> obj);
	String updateTruckOwner(HashMap<String, Object> obj, long uid);
	TbMemberTruckOwner getTruckOwner(long uid);
	String getSmsAuthNumber(String phoneNumber);
	TbTruckOwnerCargoInfo setTruckOwnerCargoInfo(CargoInfoDto obj) throws ParseException, UnsupportedEncodingException;
	String removeTruckOwnerCargoInfo(long uid);
	Page<TbMemberTruckOwner> selectTruckOwner(String carNumber, String truckownerName, String businessNo, Pageable page);
	TbSysSmslog getRegSmsLog(String receiverNumber, String authNumber);
	Map<String, Object> getTruckOwnerMainInfo(long uid, String lat, String lon);
	Map<String, Object> getTruckOwnerCurrentLocation(String lat, String lon);
	List<HistoryDto> getCargoListByTruckOwner(long uid);
	TokenDto truckOwnerLogin(HashMap<String, Object> param);
	String changePassowrd(HashMap<String, Object> param);
	boolean setRequestTransportConfirm(Map<String, Long> dto);
	List<?> getCargoListInRadius(double lat, double lon, int rad, String d);
}
