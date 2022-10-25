package com.scmc.api.member.user.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.common.utils.NaverLoginUtil;
import com.scmc.api.member.user.service.AuthService;

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
	private final AuthService authService;

	@ApiOperation(value = "토큰 갱신", notes = "발급받은 토큰을 갱신한다.")
	@PostMapping("/refresh")
	public ResponseEntity<?> tokenRefresh(HttpServletRequest request, @RequestBody HashMap<String, Object> param) {
		log.info("==================");
		log.info("토큰 갱신");
		log.info("==================");
		
		HashMap<String, Object> obj = null;
		
		String flag = param.get("social").toString();
		
		if (flag.equals("NAVER")) obj = naverLoginUtil.refreshToken(request, param);
		else obj = null;
		
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
	
	@ApiOperation(value = "화주 관리자 로그인", notes = "화주 관리자 로그인한다.")
	@PostMapping("/admin")
	public ResponseEntity<?> adminLogin(@RequestBody HashMap<String, Object> param) {
		log.info("==================");
		log.info("관리자 로그인");
		log.info("==================");
		
		return new ResponseEntity<>(authService.adminLogin(param), HttpStatus.OK);
	}
}
