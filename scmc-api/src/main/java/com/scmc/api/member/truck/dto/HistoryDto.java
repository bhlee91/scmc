package com.scmc.api.member.truck.dto;

import com.scmc.api.cargoreq.dto.RequestDto;
import com.scmc.api.jpa.domain.TbCargoRequest;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HistoryDto {

	private Long histUid;
	private RequestDto request;
	private String status;
	
	public HistoryDto(Long histUid, TbCargoRequest request, String status) {
		this.histUid = histUid;
		this.request = new RequestDto(request);
		this.status = status;
	}
}
