package com.scmc.api.member.truck.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class CargoInfoDto {
	
	private long cargoUid;
	private long truckownerUid;
	
	private String loadDt;
	private String unloadDt;
	
	private int spaceRate;
	private String cargoWeight;
	
	private String departAddrSt;
	private String departAddrSt2;
	private String departLatitude;
	private String departLongitude;
	
	private String arrivalAddrSt;
	private String arrivalAddrSt2;
	private String arrivalLatitude;
	private String arrivalLongitude;
}
