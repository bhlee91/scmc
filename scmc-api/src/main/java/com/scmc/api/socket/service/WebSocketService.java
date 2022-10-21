package com.scmc.api.socket.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbCargoRequest;
import com.scmc.api.jpa.repository.TbCargoRequestRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WebSocketService {
	
	private final TbCargoRequestRepository tbCargoRequestRepository;
	
	public List<TbCargoRequest> findAllRequest() {
		
		return tbCargoRequestRepository.findAllByOrderByReqIdAsc();
	}
} 
