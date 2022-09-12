package com.scmc.api.jpa.domain;

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

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_truckowner_cargoinfo")
@Getter
@Builder
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
	private int cargoWeight;
	
	@Column(name = "depart_addr_st")
	private String departAddrSt;
	
	@Column(name = "depart_addr_st2")
	private String departAddrSt2;
	
	@Column(name = "depart_loatitude")
	private String departLatitude;
	
	@Column(name = "depart_longitude")
	private String departLongitude;
	
	@Column(name = "arrival_addr_st")
	private String arrivalAddrSt;

	@Column(name = "arrival_addr_st2")
	private String arrivalAddrSt2;
	
	@Column(name = "arrival_latitude")
	private String arrivalLatitude;
	
	@Column(name = "arrival_longitude")
	private String arrivalLongitude;
	
	@Column(name = "cancelyn")
	private String cancelyn;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_dt")
	private Date modDt;
}
