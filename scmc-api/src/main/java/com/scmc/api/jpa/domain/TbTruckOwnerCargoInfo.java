package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_truckowner_cargoinfo")
@Getter @ToString
public class TbTruckOwnerCargoInfo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cargo_uid")
	private long cargoUid;
	
	@Column(name = "truckowner_uid")
	private long truckownerUid;
	
	@Column(name = "load_dt")
	@Temporal(TemporalType.TIMESTAMP)
	private Date loadDt;
	
	@Column(name = "unload_dt")
	@Temporal(TemporalType.TIMESTAMP)
	private Date unloadDt;
	
	@Column(name = "space_rate")
	private int spaceRate;
	
	@Column(name = "cargo_weight")
	private String cargoWeight;
	
	@Column(name = "depart_addr_st")
	private String departAddrSt;
	
	@Column(name = "depart_addr_st2")
	private String departAddrSt2;
	
	@Column(name = "depart_latitude")
	private Float departLatitude;
	
	@Column(name = "depart_longitude")
	private Float departLongitude;
	
	@Column(name = "arrival_addr_st")
	private String arrivalAddrSt;

	@Column(name = "arrival_addr_st2")
	private String arrivalAddrSt2;
	
	@Column(name = "arrival_latitude")
	private Float arrivalLatitude;
	
	@Column(name = "arrival_longitude")
	private Float arrivalLongitude;
	
	@Column(name = "cancelyn")
	private String cancelyn;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	public TbTruckOwnerCargoInfo() {}

	@Builder(builderMethodName = "insertCargoInfo")
	public TbTruckOwnerCargoInfo(long truckownerUid, Date loadDt, Date unloadDt, int spaceRate,
			String cargoWeight, String departAddrSt, String departAddrSt2, float departLatitude, float departLongitude,
			String arrivalAddrSt, String arrivalAddrSt2, float arrivalLatitude, float arrivalLongitude) throws ParseException {
		
		this.truckownerUid = truckownerUid;
		this.loadDt = loadDt;
		this.unloadDt = unloadDt;
		this.spaceRate = spaceRate;
		this.cargoWeight = cargoWeight;
		this.departAddrSt = departAddrSt;
		this.departAddrSt2 = departAddrSt2;
		this.departLatitude = departLatitude;
		this.departLongitude = departLongitude;
		this.arrivalAddrSt = arrivalAddrSt;
		this.arrivalAddrSt2 = arrivalAddrSt2;
		this.arrivalLatitude = arrivalLatitude;
		this.arrivalLongitude = arrivalLongitude;
	}
	
	public void updateCargoInfo(String loadDt, String unloadDt, int spaceRate,
			String cargoWeight, String departAddrSt, String departAddrSt2, float departLatitude, float departLongitude,
			String arrivalAddrSt, String arrivalAddrSt2, float arrivalLatitude, float arrivalLongitude) throws ParseException {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		this.loadDt = format.parse(loadDt);
		this.unloadDt = format.parse(unloadDt);
		this.spaceRate = spaceRate;
		this.cargoWeight = cargoWeight;
		this.departAddrSt = departAddrSt;
		this.departAddrSt2 = departAddrSt2;
		this.departLatitude = departLatitude;
		this.departLongitude = departLongitude;
		this.arrivalAddrSt = arrivalAddrSt;
		this.arrivalAddrSt2 = arrivalAddrSt2;
		this.arrivalLatitude = arrivalLatitude;
		this.arrivalLongitude = arrivalLongitude;
	}
}
