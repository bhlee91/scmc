package com.scmc.api.member.user.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_member_cargoowner")
@Getter
@Setter
@NoArgsConstructor
public class User {

	@Id
	@Column(name = "owner_uid")
	private long ownerUid;
	
	@Column(name = "userid")
	private String userId;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "owner_name")
	private String ownerName;
	
	@Column(name = "unregister_yn")
	private String unregisterYn;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_dt")
	private Date modDt;
}
