package com.scmc.api.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.scmc.api.socket.component.ChatHandler;

import lombok.RequiredArgsConstructor;

//@Configuration
//@RequiredArgsConstructor
//@EnableWebSocket
public class WebSocketConfiguration /*implements WebSocketConfigurer*/{

//	private final ChatHandler chatHandler;
//	
//	@Override
//	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(chatHandler, "/ws/chat")
//		        .setAllowedOrigins("http://localhost:8080")
//		        .withSockJS();
//	}
}
