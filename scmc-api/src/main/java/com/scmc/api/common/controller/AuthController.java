package com.scmc.api.common.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.common.utils.KaKaoLoginUtil;
import com.scmc.api.common.utils.NaverLoginUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "권한 인증")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
	
	private final NaverLoginUtil naverLoginUtil;
	private final KaKaoLoginUtil kakaoLoginUtil;

	@ApiOperation(value = "카카오 로그인", notes = "카카오 로그인을 통해 사용자 정보 저장 후 토큰 생성")
	@PostMapping("/kakao")
	public ResponseEntity<?> kakaoAuthRequest() throws Exception {
		log.info("==================");
		log.info("카카오 로그인");
		log.info("==================");
		
		return new ResponseEntity<>(kakaoLoginUtil.authConnect(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "카카오 Callback URL", notes = "인증 요청의 CallbackURL")
	@GetMapping("/kakao/callback")
	public ResponseEntity<?> kakaoAuthRequest(@RequestParam(value = "code") String code) throws Exception {
		log.info("==================");
		log.info("카카오 callback url");
		log.info("==================");
		
		return new ResponseEntity<>(kakaoLoginUtil.getKaKaoToken(code), HttpStatus.OK);
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
		log.info("네이버 로그인");
		log.info("==================");
		
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("code", code);
		param.put("state", state);
		
		return new ResponseEntity<>(naverLoginUtil.getNaverToken(request, param), HttpStatus.OK);
	}
	
	@ApiOperation(value = "토큰 갱신", notes = "발급받은 토큰을 갱신한다.")
	@PostMapping("/refresh")
	public ResponseEntity<?> tokenRefresh(@RequestBody HashMap<String, Object> param) {
		log.info("==================");
		log.info("토큰 갱신");
		log.info("==================");
		
		HashMap<String, Object> obj = null;
		
		String flag = param.get("social").toString();
		
		if (flag.equals("NAVER")) obj = naverLoginUtil.refreshToken(param);
		else obj = null;
		
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
}
