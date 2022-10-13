package com.scmc.api.member.truck.controller;

import java.util.HashMap;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.common.utils.CommonUtil;
import com.scmc.api.member.truck.dto.CargoInfoDto;
import com.scmc.api.member.truck.service.TruckOwnerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "차주 회원용")
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@Slf4j
public class TruckOwnerController {
	
	private final TruckOwnerService truckOwnerService;
	
	@ApiOperation(value = "차주 등록", notes = "차주 등록")
	@PostMapping("/truck")
	public ResponseEntity<?> insertTruckOwner(@RequestBody HashMap<String, Object> obj) throws Exception {
		log.info("==================");
		log.info("차주 등록");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.insertTruckOwner(obj), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 수정", notes = "차주 수정")
	@PutMapping("/truck/{uid}")
	public ResponseEntity<?> updateTruckOwner(@RequestBody HashMap<String, Object> obj,
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "uid") Long uid
			) throws Exception {
		log.info("==================");
		log.info("차주 수정");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.updateTruckOwner(obj, uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 회원정보 조회", notes = "차주의 회원정보를 조회한다.")
	@GetMapping("/truck/{uid}")
	public ResponseEntity<?> getTruckOwner(
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "uid") Long uid
			) throws Exception {
		log.info("==================");
		log.info("차주 회원정보 조회");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.getTruckOwner(uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 회원가입시 sms 인증", notes = "입력한 휴대폰 번호에 인증 번호 메시지를 보낸다.")
	@GetMapping("/sms")
	public ResponseEntity<?> getSmsAuthNumber(
			@ApiParam(value = "휴대폰번호('-'없이 입력)") @RequestParam(value = "phoneNumber", required = true) String phoneNumber
			) throws Exception {
		String authNumber = truckOwnerService.getSmsAuthNumber(phoneNumber);
		log.info("==================");
		log.info("sms 인증번호 조회");
		log.info("==================");
		
		return new ResponseEntity<>(authNumber, HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 회원가입시 sms 인증확인", notes = "입력한 인증번호가 맞는지 확인한다.")
	@GetMapping("/smsLog")
	public ResponseEntity<?> getRegSmsLog(
			@ApiParam(value = "휴대폰번호('-'없이 입력)") @RequestParam(value = "phoneNumber", required = true) String phoneNumber,
			@ApiParam(value = "인증번호") @RequestParam(value = "authNumber", required = true) String authNumber
			) throws Exception {
		log.info("==================");
		log.info("sms 인증 확인");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.getRegSmsLog(phoneNumber, authNumber), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 화물정보 등록/수정", notes = "차주의 화물정보를 등록/수정한다.")
	@PostMapping("/cargo")
	public ResponseEntity<?> setCargoInfo(@RequestBody CargoInfoDto dto) throws Exception {
		log.info("==================");
		log.info("차주 화물정보 등록/수정 => " + dto.toString());
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.setTruckOwnerCargoInfo(dto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 화물정보 삭제", notes = "차주의 화물정보를 삭제한다.")
	@DeleteMapping("/cargo/{uid}")
	public ResponseEntity<?> removeCargoInfo(
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "uid") Long uid
		) throws Exception {
		log.info("==================");
		log.info("차주 화물정보 삭제");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.removeTruckOwnerCargoInfo(uid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 목록 조회(검색)", notes = "차주목록을 조회한다.")
	@GetMapping("/truck/ownerList")
	public ResponseEntity<?> selectTruckOwner(
			@ApiParam(value = "차량 번호", example = "45오4545") @RequestParam(value = "carNumber", required = false) String carNumber,
			@ApiParam(value = "차주 성명", example = "") @RequestParam(value = "truckownerName", required = false) String truckownerName,
			@ApiParam(value = "사업자번호", example = "") @RequestParam(value = "businessNo", required = false) String businessNo,
			@PageableDefault(sort = {"truckownerUid"}, direction = Sort.Direction.ASC) Pageable page
			
			) throws Exception {
		log.info("==================");
		log.info("차주 목록 조회(검색)");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.selectTruckOwner(carNumber,truckownerName,businessNo, page), HttpStatus.OK);
	}
	
	@ApiOperation(value = "모바일 차주 메인", notes = "모바일 차주 메인 관련 정보를 조회한다.")
	@GetMapping("/truck/main/{truckownerUid}")
	public ResponseEntity<?> getTruckOwnerMainInfo(
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "truckownerUid") long uid,
			@ApiParam(value = "현위치 위도") @RequestParam(value = "lat", required = false) String lat,
			@ApiParam(value = "현위치 경도") @RequestParam(value = "lon", required = false) String lon
			) throws Exception {
		log.info("==================");
		log.info("모바일 차주 메인 조회");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.getTruckOwnerMainInfo(uid, lat, lon), HttpStatus.OK);
	}
	
	@ApiOperation(value = "모바일 차주 현위치 새로고침", notes = "모바일 차주 현위치를 다시 조회한다.")
	@GetMapping("/truck/main/location")
	public ResponseEntity<?> getTruckOwnerRefreshLocation(
			@ApiParam(value = "현위치 위도") @RequestParam(value = "lat", required = false) String lat,
			@ApiParam(value = "현위치 경도") @RequestParam(value = "lon", required = false) String lon
			) throws Exception {
		log.info("==================");
		log.info("모바일 차주 현위치 새로고침");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.getTruckOwnerCurrentLocation(lat, lon), HttpStatus.OK);
	}
	
	@ApiOperation(value = "모바일 차주 로그인", notes = "모바일 차주 메인 관련 정보를 조회한다.")
	@PostMapping("/truck/login")
	public ResponseEntity<?> truckownerLogin(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("==================");
		log.info("모바일 차주 로그인");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.truckOwnerLogin(param), HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주 비밀번호 변경", notes = "차주 비밀번호를 변경한다.")
	@PostMapping("/truck/chpwd")
	public ResponseEntity<?> changePassowrd(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("==================");
		log.info("차주 비밀번호 변경");
		log.info("==================");
		
		return new ResponseEntity<>(truckOwnerService.changePassowrd(param), HttpStatus.OK);
	}
	
	@ApiOperation(value = "두 지점 거리 계산(테스트용)", notes = "두 지점 거리 계산(테스트용)")
	@GetMapping("/truck/distance/test")
	public ResponseEntity<?> getDistanceTest(
			@ApiParam(value = "위도1") @RequestParam(value = "lat1", required = false) String strLat1,
			@ApiParam(value = "경도1") @RequestParam(value = "lon1", required = false) String strLon1,
			@ApiParam(value = "위도2") @RequestParam(value = "lat2", required = false) String strLat2,
			@ApiParam(value = "경도2") @RequestParam(value = "lon2", required = false) String strLon2,
			@ApiParam(value = "단위", example = "km") @RequestParam(value = "unit", required = true) String unit
			) throws Exception {
		log.info("==================");
		log.info("두 지점 거리 계산(테스트용)");
		log.info("==================");
		
		double lat1 = Double.parseDouble(strLat1);
		double lon1 = Double.parseDouble(strLon1);
		double lat2 = Double.parseDouble(strLat2);
		double lon2 = Double.parseDouble(strLon2);
		
		return new ResponseEntity<>(CommonUtil.distance(lat1, lon1, lat2, lon2, unit), HttpStatus.OK);
	}
	
	@ApiOperation(value = "반경 리스트 조회(테스트용)", notes = "반경 리스트 조회(테스트용)")
	@GetMapping("/truck/request")
	public ResponseEntity<?> getCargoListInRadius(
			@ApiParam(value = "현재 위도(latitude)") @RequestParam(value = "lat", required = true) String strLat,
			@ApiParam(value = "현재 경도(longitude)") @RequestParam(value = "lon", required = true) String strLon,
			@ApiParam(value = "반경", example = "10") @RequestParam(value = "rad", required = false, defaultValue = "10") String strRad,
			@ApiParam(value = "기준", example = "reg") @RequestParam(value = "div", required = false, defaultValue = "reg") String div
			) throws Exception {
		log.info("==================");
		log.info("반경 리스트 조회(테스트용)");
		log.info("==================");
		
		double lat = Double.parseDouble(strLat);
		double lon = Double.parseDouble(strLon);
		int rad = Integer.parseInt(strRad);
		
		return new ResponseEntity<>(truckOwnerService.getCargoListInRadius(lat, lon, rad, div), HttpStatus.OK);
	}
}
