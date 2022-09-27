package com.scmc.api.customer.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class TermsDto {

	private long termsUid;
	private String termsType;
	private String versions;
	private String contents;
	private String expDiv;
	private String useYn;
	private String regId;
}
