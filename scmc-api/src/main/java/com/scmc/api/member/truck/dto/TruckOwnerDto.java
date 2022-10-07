package com.scmc.api.member.truck.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class TruckOwnerDto {
	
	private long truckownerUid;
	private String carNumber;
	private String phoneNumber;
	private String truckownerName;
	private String businessNo;
	
	private String truckTons;
	private String longyn;
	private String refrigeratedFrozen;
	private String stowageType;
	private String liftType;
}
