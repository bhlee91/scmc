package com.scmc.api.member.truck.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class CargoInfoDto {
	
	private long truckownerUid;
	
	private String loadDt;
	private String unloadDt;
	
	private int spaceRate;
	private String cargoWeight;
	
	private String departAddrSt;
	private String arrivalAddrSt;
}