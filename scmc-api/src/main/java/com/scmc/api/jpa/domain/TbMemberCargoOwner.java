package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_member_cargoowner")
@Getter
public class TbMemberCargoOwner {
	
	@Id
	@Column(name = "owner_uid")
	private int owner_uid;
	
	@Column(name = "phone_number")
	private String phone_number;
	
	@Column(name = "owner_name")
	private String owner_name;
	
	@Column(name = "token")
	private String token;
	
	@Column(name = "refresh_token")
	private String refresh_token;
	
	@Column(name = "expired_time")
	private int expired_time;
	
	@Column(name = "unregister_yn")
	private String unregister_yn;
	
	@Column(name = "reg_dt")
	private Date reg_dt;
	
	@Column(name = "mod_dt")
	private Date mod_dt;
}
