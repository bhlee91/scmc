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
	private float departLatitude;
	private float departLongitude;
	
	private String arrivalAddrSt;
	private String arrivalAddrSt2;
	private float arrivalLatitude;
	private float arrivalLongitude;
}
