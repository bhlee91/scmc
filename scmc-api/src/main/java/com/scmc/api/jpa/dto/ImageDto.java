package com.scmc.api.jpa.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ImageDto {

	private Long imageId;
	
	private String memDiv;
	private int imageSeq;
	
	private byte[] imageContents;
	private String original;
	private String thumbnail;
	private Date regDt;

	public ImageDto(Long imageId, String memDiv, int imageSeq, byte[] imageContents, Date regDt) {
		this.imageId = imageId;
		this.memDiv = memDiv;
		this.imageSeq = imageSeq;
		this.imageContents = imageContents;
		this.original = new String(imageContents);
		this.thumbnail = this.original;
		this.regDt = regDt;
	}
}
