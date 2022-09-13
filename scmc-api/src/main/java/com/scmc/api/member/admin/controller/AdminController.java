package com.scmc.api.member.admin.controller;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.member.admin.service.AdminService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "관리자용")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {

	private final AdminService adminService;
	
	@ApiOperation(value = "관리자 테스트(post method)", notes = "관리자 api 테스트용")
	@PostMapping("/test")
	public ResponseEntity<?> postTest(@RequestBody HashMap<String, Object> obj) {
		
		log.info("==================");
		log.info("관리자 test(post)");
		log.info("==================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "관리자 테스트(get method)", notes = "관리자 api 테스트용")
	@GetMapping("/test/{id}")
	public ResponseEntity<?> getTest(
			@ApiParam(value = "id", example = "1") @PathVariable(value = "id") Long id
		) {
		
		log.info("==================");
		log.info("관리자 test(get)");
		log.info("==================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "관리자 테스트(put method)", notes = "관리자 api 테스트용")
	@PutMapping("/test/{id}")
	public ResponseEntity<?> putTest(
			@ApiParam(value = "id", example = "1") @PathVariable(value = "id") Long id
		) {
		
		log.info("==================");
		log.info("관리자 test(put)");
		log.info("==================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value = "관리자 테스트(delete method)", notes = "관리자 api 테스트용")
	@DeleteMapping("/test/{id}")
	public ResponseEntity<?> deleteTest(
			@ApiParam(value = "id", example = "1") @PathVariable(value = "id") Long id
		) {
		
		log.info("==================");
		log.info("관리자 test(delete)");
		log.info("==================");
		
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
