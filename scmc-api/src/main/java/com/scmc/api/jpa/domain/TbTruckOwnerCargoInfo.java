package com.scmc.api.jpa.domain;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

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
import lombok.NoArgsConstructor;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_truckowner_cargoinfo")
@Getter
@NoArgsConstructor
public class TbTruckownerCargoinfo {
	
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
	
	@Builder(builderMethodName = "insertTruckOwnerCargoInfo")
	public TbTruckownerCargoinfo(Map<String, Object> obj) {
		this.truckownerUid = Long.parseLong(obj.get("truckownerUid").toString());
		this.loadDt = Timestamp.valueOf(obj.get("loadDt").toString());
		this.unloadDt = Timestamp.valueOf(obj.get("unLoadDt").toString());
		this.spaceRate = obj.get("spaceRate").equals(null) ? 0 : Integer.parseInt(obj.get("spaceRate").toString());
		this.cargoWeight = obj.get("cargoWeight").equals(null) ? 0 : Integer.parseInt(obj.get("cargoWeight").toString());
		this.departAddrSt = obj.get("departAddrSt").toString();
		this.departAddrSt2 = obj.get("departAddrSt2").toString();
		this.departLatitude = obj.get("departLatitude").toString();
		this.departLongitude = obj.get("departLongitude").toString();
		this.arrivalAddrSt = obj.get("arrivalAddrSt").toString();
		this.arrivalAddrSt2 = obj.get("arrivalAddrSt2").toString();
		this.arrivalLatitude = obj.get("arrivalLatitude").toString();
		this.arrivalLongitude = obj.get("arrivalLongitude").toString();
	}
	
	@Builder(builderMethodName = "updateCancelYn")
	public TbTruckownerCargoinfo(long truckownerUid, String cancelyn) {
		this.truckownerUid = truckownerUid;
		this.cancelyn = cancelyn;
	}
}
