package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_member_truckowner")
@Getter
public class TbMemberTruckOwner {

	@Id
	@Column(name = "truckowner_uid")
	private int truckowner_uid;
	
	@Column(name = "car_number")
	private String car_number;
	
	@Column(name = "phone_number")
	private String phone_number;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "owner_name")
	private String truckowner_name;
	
	@Column(name = "business_no")
	private String business_no;
	
	@Column(name = "addr_st")
	private String addr_st;
	
	@Column(name = "addr_st2")
	private String addr_st2;
	
	@Column(name = "truck_tons")
	private String truck_tons;
	
	@Column(name = "longyn")
	private String longyn;
	
	@Column(name = "refrigerated_frozen")
	private String refrigerated_frozen;
	
	@Column(name = "stowage_type")
	private String stowage_type;
	
	@Column(name = "lift_type")
	private String lift_type;
	
	@Column(name = "token")
	private String token;
	
	@Column(name = "refresh_token")
	private String refresh_token;
	
	@Column(name = "expired_time")
	private int expired_time;
	
	@Column(name = "password_expireddate")
	private Date password_expireddate;
	
	@Column(name = "pwd_failcount")
	private int pwd_failcount;
	
	@Column(name = "unregister_yn")
	private String unregister_yn;
	
	@Column(name = "reg_dt")
	private Date reg_dt;
	
	@Column(name = "mod_dt")
	private Date mod_dt;
}
