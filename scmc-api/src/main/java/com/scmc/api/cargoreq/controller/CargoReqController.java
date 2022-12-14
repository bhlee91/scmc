package com.scmc.api.cargoreq.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.cargoreq.dto.RequestDetailDto;
import com.scmc.api.cargoreq.dto.RequestDto;
import com.scmc.api.cargoreq.service.CargoReqService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "의뢰내역")
@RestController
@RequestMapping("/cargo")
@RequiredArgsConstructor
@Slf4j
public class CargoReqController {

	private final CargoReqService cargoReqService;
	
	@ApiOperation(value = "화주별 이용내역 조회", notes = "화주별 이용내역 리스트를 조회한다.")
	@GetMapping({"/request", "/request/{ownerUid}"})
	public ResponseEntity<?> selectCargoRequest(
			@ApiParam(value = "화주 uid", example = "1") @PathVariable(value = "ownerUid", required = false) Long ownerUid,
			@ApiParam(value = "출발일", example = "2022-01-01") @RequestParam(value = "departDate", required = false) String departDate,
			@ApiParam(value = "도착일", example = "2022-12-31") @RequestParam(value = "arrivalDate", required = false) String arrivalDate,
			@ApiParam(value = "화주 휴대폰번호", example = "010-1234-5678") @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
			@ApiParam(value = "상태", example = "MO") @RequestParam(value = "status", required = false) String status
			) throws Exception {
		log.info("========================");
		log.info("사용자별 이용내역 리스트 조회 => " + departDate + ", " + arrivalDate + ", " + phoneNumber + ", " + status);
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectCargoRequest(ownerUid, departDate, arrivalDate, phoneNumber, status), HttpStatus.OK);
	}
	
	@ApiOperation(value = "화주별 이용내역 조회", notes = "화주별 이용내역 리스트를 조회한다.")
	@GetMapping("/requestByStat")
	public ResponseEntity<?> selectCargoRequestByStatus(
			@ApiParam(value = "화주 uid", example = "1") @RequestParam(value = "ownerUid") Long ownerUid,
			@RequestParam(value = "status") List<String> status 
			) throws Exception {
		log.info("========================");
		log.info("사용자별 상태 별 이용내역 리스트 조회");
		log.info("========================");
		
		
		//cargoReqService.selectCargoRequestByStatus(ownerUid, stat),
		//System.out.println(param.toString());
		return new ResponseEntity<>(cargoReqService.selectCargoRequestByStatus(ownerUid, status), HttpStatus.OK);
	}
	
	@ApiOperation(value = "의뢰 내역 등록/수정", notes = "의뢰내역을 등록/수정한다.")
	@PostMapping("/request")
	public ResponseEntity<?> saveCargoRequest(@RequestBody RequestDto dto) throws Exception {
		log.info("========================");
		log.info("의뢰내역 등록/수정");
		log.info("========================");
	
		return new ResponseEntity<>(cargoReqService.saveRequest(dto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "매칭관리 조회", notes = "매칭관리 리스트 조회한다.")
	@GetMapping("/request/matching")
	public ResponseEntity<?> selectRequestMatching(
			@ApiParam(value = "출발일", example = "2022-01-01") @RequestParam(value = "departDate", required = false) String departDate,
			@ApiParam(value = "도착일", example = "2022-12-31") @RequestParam(value = "arrivalDate", required = false) String arrivalDate,
			@ApiParam(value = "화주 휴대폰번호", example = "010-1234-5678") @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
			@ApiParam(value = "화물명", example = "화물명") @RequestParam(value = "cargoName", required = false) String cargoName,
			@ApiParam(value = "상태", example = "MO") @RequestParam(value = "status", required = false) String status
			) throws Exception {
		
		log.info("========================");
		log.info("매칭관리 리스트 조회 테스트 용");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectRequestMatching(departDate, arrivalDate, phoneNumber, cargoName, status), HttpStatus.OK);	
	}
	
	@ApiOperation(value = "의뢰 비용 계산 후 조회", notes = "의뢰 비용 계산 후 조회한다.")
	@GetMapping("/request/fare")
	public ResponseEntity<?> selectRequestFare(
			@ApiParam(value = "출발지 위도") @RequestParam(value = "departLatitude") Float departLatitude,
			@ApiParam(value = "출발지 경도") @RequestParam(value = "departLongitude") Float departLongitude,
			@ApiParam(value = "도착지 위도") @RequestParam(value = "arrivalLatitude") Float arrivalLatitude,
			@ApiParam(value = "도착지 경도") @RequestParam(value = "arrivalLongitude") Float arrivalLongitude
			) throws Exception {
		
		log.info("========================");
		log.info("의뢰 비용 계산 후 조회");
		log.info("========================");
		
		Map<String, Float> obj = new HashMap<String, Float>();
		obj.put("departLatitude", departLatitude);
		obj.put("departLongitude", departLongitude);
		obj.put("arrivalLatitude", arrivalLatitude);
		obj.put("arrivalLongitude", arrivalLongitude);
		
		return new ResponseEntity<>(cargoReqService.selectRequestFare(obj), HttpStatus.OK);	
	}
	
	@ApiOperation(value = "", notes = "매칭관리 리스트 조회 테스트 용입니다.")
	@PutMapping("/request/fare")
	public ResponseEntity<?> saveRequestFareInAdmin(@RequestBody HashMap<String, Object> obj) throws Exception {
		
		log.info("========================");
		log.info("관리자 화물관리 저장 (요금 수정)");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.saveRequestFare(obj), HttpStatus.OK);	
	}
	
	/*
	 * 진행상태 
	 * RO: 준비/등록중 
	 * MO: 최적차량검색
	 * MF: 매칭완료
	 * LC: 상차완료
	 * TO: 운송중
	 * UC: 하차완료
	 * TF: 운송완료
	 * TN: 운송취소
	 */
	@ApiOperation(value = "의뢰 내역 상태 변경", notes = "의뢰내역 상태를 변경한다.")
	@PostMapping("/status")
	public ResponseEntity<?> updateCargoRequestStatus(
			@ApiParam(value = "진행 상태", example = "RO") @RequestParam(value = "status") String status,
			@ApiParam(value = "의뢰 번호", example = "1") @RequestParam(value = "reqId") Long reqId
			) throws Exception {
		log.info("========================");
		log.info("의뢰내역 상태 변경");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.updateStatus(status, reqId), HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "의뢰 이력 등록", notes = "의뢰 이력을 등록한다.")
	@PostMapping("/history")
	public ResponseEntity<?> createCargoHist(@RequestBody HashMap<String, Object> param) throws Exception {
		log.info("========================");
		log.info("의뢰이력 등록/수정");
		log.info("========================");
	
		return new ResponseEntity<>(cargoReqService.insertHistory(param), HttpStatus.OK);
	}

	@ApiOperation(value = "주소로 위도, 경도 조회", notes = "주소로 위도, 경도를 조회한다.")
	@GetMapping("/address")
	public ResponseEntity<?> searchAddress(
			@ApiParam(value = "주소명", example = "") @RequestParam(value = "query") String query
			) {
		log.info("========================");
		log.info("주소로 위도, 경도 찾기");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.searchAddress(query) ,HttpStatus.OK);
	}
	
	@ApiOperation(value = "차주별 운송내역 전체 조회", notes = "차주별 운송내역 리스트를 조회한다.")
	@GetMapping("/transit/{truckownerUid}")
	public ResponseEntity<?> selectCargoRequestByTruckOwner(
			@ApiParam(value = "차주 uid", example = "1") @PathVariable(value = "truckownerUid") Long truckownerUid
			) throws Exception {
		log.info("========================");
		log.info("차주 운송내역 리스트 조회");
		log.info("========================");
		log.info("파라미터 = "+truckownerUid);
		return new ResponseEntity<>(cargoReqService.selectCargoRequestByTruckOwnerUid(truckownerUid), HttpStatus.OK);
	}
	
	@ApiOperation(value = "운송 상세 정보 조회", notes = "운송 상세 정보를 조회한다.")
	@GetMapping("/request/detail/{reqId}")
	public ResponseEntity<?> selectCargoRequestDetail(
			@ApiParam(value = "화물 의뢰 번호", example = "1") @PathVariable(value = "reqId") Long reqId
			) throws Exception {
		log.info("========================");
		log.info("운송 상제정보 조회");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectCargoRequestDetail(reqId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "운송 상세 정보 등록/수정", notes = "운송 상세를 등록/수정한다.")
	@PostMapping("/request/detail")
	public ResponseEntity<?> updateCargoRequestDetail(@RequestBody RequestDetailDto dto) throws Exception {
		log.info("========================");
		log.info("운송 상세정보 등록/수정");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.updateCargoRequestDetail(dto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "운송이력", notes = "운송이력을 등록/수정한다.")
	@GetMapping("/request/hist/{reqId}")
	public ResponseEntity<?> getReqHist(
			@ApiParam(value = "화물 의뢰 번호", example = "1") @PathVariable(value = "reqId") Long reqId) throws Exception {
		log.info("========================");
		log.info("운송 이력");
		log.info("========================");
		
		return new ResponseEntity<>(cargoReqService.selectCargoHist(reqId), HttpStatus.OK);
	}
	
	@ApiOperation(value = "운송비 추가", notes = "운송비 추가")
	@PostMapping("/request/addFare")
	public ResponseEntity<?> setAddFare(@RequestBody Map<String, Object> obj) throws Exception {
		Long reqId = Long.parseLong(obj.get("reqId").toString());
		int additionalFare = Integer.parseInt(obj.get("additionalFare").toString());
		log.info("==================");
		log.info("운송비 추가");
		log.info("==================");
		
		return new ResponseEntity<>(cargoReqService.updateAddFare(reqId, additionalFare), HttpStatus.OK);
	}
}
