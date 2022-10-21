package com.scmc.api.socket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.scmc.api.socket.service.WebSocketService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {
	
	private final SimpMessagingTemplate template;
	private final WebSocketService service;

	@MessageMapping("/request")
	public void socketTest() throws Exception {
		log.info("소켓 테스트");
		
		template.convertAndSend("/sub/send/request", service.findAllRequest());
	}
	
}
