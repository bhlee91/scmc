package com.scmc.api.common.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.common.utils.KaKaoLoginUtil;
import com.scmc.api.common.utils.NaverGeoUtil;
import com.scmc.api.common.utils.NaverLoginUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "Open Api 용")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class CommonController {
	
	private final KaKaoLoginUtil kakaoLoginUtil;
	private final NaverLoginUtil naverLoginUtil;
	private final NaverGeoUtil naverGeoUtil;
	
	@ApiOperation(value = "카카오 로그인", notes = "카카오 로그인을 통해 사용자 정보 저장 후 토큰 생성")
	@PostMapping("/kakao")
	public ResponseEntity<?> kakaoAuthRequest(HttpServletRequest request) throws Exception {
		log.info("==================");
		log.info("카카오 로그인");
		log.info("==================");
		
		return new ResponseEntity<>(kakaoLoginUtil.authConnect(request), HttpStatus.OK);
	}
	
	@ApiOperation(value = "카카오 Callback URL", notes = "인증 요청의 CallbackURL")
	@GetMapping("/kakao/callback")
	public ResponseEntity<?> kakaoCallback(HttpServletRequest request,
			@RequestParam(value = "code") String code) throws Exception {
		log.info("==================");
		log.info("카카오 callback url");
		log.info("==================");
		
		return new ResponseEntity<>(kakaoLoginUtil.getKaKaoToken(request, code), HttpStatus.OK);
	}
	
	@ApiOperation(value = "네이버 로그인", notes = "네이버 로그인을 통해 사용자 정보 저장 후 토큰 생성")
	@PostMapping("/naver")
	public ResponseEntity<?> naverAuthRequest(HttpServletRequest request) throws Exception {
		log.info("==================");
		log.info("네이버 로그인");
		log.info("==================");
		
		return new ResponseEntity<>(naverLoginUtil.authConnect(request), HttpStatus.OK);
	}
	
	@ApiOperation(value = "네이버 Callback URL", notes = "인증 요청의 CallbackURL")
	@GetMapping("/naver/callback")
	public ResponseEntity<?> naverCallback(HttpServletRequest request,
			@RequestParam(value = "code") String code,
			@RequestParam(value = "state") String state
		) throws Exception {
		log.info("==================");
		log.info("네이버 callback url");
		log.info("==================");
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("code", code);
		param.put("state", state);
		
		return new ResponseEntity<>(naverLoginUtil.getNaverToken(request, param), HttpStatus.OK);
	}
	
	@ApiOperation(value = "주소를 좌표로 변환", notes = "주소를 좌표로 변환")
	@GetMapping("/address2coord")
	public ResponseEntity<?> getAddress2Coord(
			@ApiParam(value = "주소") @RequestParam(value = "query", required = false) String query
			) throws Exception {
		log.info("==================");
		log.info("주소를 좌표로 변환");
		log.info("==================");
		
		return new ResponseEntity<>(naverGeoUtil.address2Coord(query), HttpStatus.OK);
	}
}
