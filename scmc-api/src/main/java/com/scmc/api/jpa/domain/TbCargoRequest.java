package com.scmc.api.jpa.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;

import lombok.Getter;

@Entity
@Table(name = "tb_cargo_request")
@Getter
public class TbCargoRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "req_id")
	private Long reqId;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@Column(name = "cargo_name")
	private String cargoName;
	
	@Column(name = "truck_uid")
	private Long truckUid;
	
	@Column(name = "cweight")
	private float cweight;
	
	@Column(name = "cheight")
	private float cheight;
	
	@Column(name = "cwidth") 
	private float cwidth;
	
	@Column(name = "cverticalreal")
	private float cverticalreal;
	
	@Column(name = "depart_datetimes")
	private Date departDatemtimes;
	
	@Column(name = "arrival_datetimes")
	private Date arrivalDatetimes;
	
	@Column(name = "depart_addr_st")
	private String departAddrSt;
	
	@Column(name = "depart_addr_st2")
	private String departAddrSt2;
	
	@Column(name = "depart_addr_old")
	private String departAddrOld;
	
	@Column(name = "depart_addr_old2")
	private String departAddrOld2;
	
	@Column(name = "arrival_addr_st")
	private String arrivalAddrSt;
	
	@Column(name = "arrival_addr_st2")
	private String arrivalAddrSt2;
	
	@Column(name = "arrival_addr_old")
	private String arrivalAddrOld;
	
	@Column(name = "arrival_addr_old2")
	private String arrivalAddrOld2;
	
	@Column(name = "receiver_phone")
	private String receiverPhone;
	
	@Column(name = "depart_latitude")
	private String deprtLatitude;
	
	@Column(name = "depart_longitude")
	private String departLongitude;
	
	@Column(name = "arrival_latitude")
	private String arrivalLatitude;
	
	@Column(name = "arrival_longitude")
	private String arrivalLongitude;
	
	@Column(name = "load_method")
	private String loadMethod;
	
	@Column(name = "unload_method")
	private String unloadMethod;
	
	@Column(name = "request_items")
	private String requestItems;
	
	@Column(name = "transit_fare")
	private int transitFare;
	
	@Column(name = "additional_fare")
	private int additionalFare;
	
	@Column(name = "req_comyn")
	private String reqComyn;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "reg_com_date")
	private Date regComDate;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	@JsonIgnore
	@OneToMany(mappedBy = "tbCargoRequest", fetch = FetchType.LAZY)
	@Convert()
	private List<TbCargoImage> images = new ArrayList<>();

}
