package com.scmc.api.cargoreq.dto;

import lombok.Data;

@Data
public class ImageDto {

	private Long imageId;
	private int imageSeq;
	private String memDiv;
	private String methodDiv;
	private String contents;
}
