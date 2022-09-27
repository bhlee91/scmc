package com.scmc.api.info.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class ProductInfoDto {
	
	private Long productUid;
	private String productName;
	private int price;
	private int discountRate;
	private String productStartdt;
	private String productEnddt;
	private String useyn;
	private String regId;
}
