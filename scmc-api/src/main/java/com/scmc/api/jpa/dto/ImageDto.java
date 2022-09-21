package com.scmc.api.jpa.dto;

import java.util.Date;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString @RequiredArgsConstructor
public class ImageDto {

	private Long imageId;
	
	private String memDiv;
	private int imageSeq;
	
	private byte[] imageContents;
	private String contents;
	private Date regDt;

	public ImageDto(Long imageId, String memDiv, int imageSeq, byte[] imageContents, Date regDt) {
		this.imageId = imageId;
		this.memDiv = memDiv;
		this.imageSeq = imageSeq;
		this.imageContents = imageContents;
		this.contents = new String(imageContents);
		this.regDt = regDt;
	}
}
