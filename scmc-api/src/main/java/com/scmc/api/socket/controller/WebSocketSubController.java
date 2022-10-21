package com.scmc.api.socket.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.socket.service.WebSocketService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class WebSocketSubController {

	private final WebSocketService service;
	
	@PostMapping("/request")
	public ResponseEntity<?> selectRequest() throws Exception {
		
		return new ResponseEntity<>(service.findAllRequest(), HttpStatus.OK);
	}
}
