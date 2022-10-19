package com.scmc.api.cargoreq.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestDetailDto {

	private Long reqId;
	private List<ImageDto> lmFiles;
	private List<ImageDto> umFiles;
}
