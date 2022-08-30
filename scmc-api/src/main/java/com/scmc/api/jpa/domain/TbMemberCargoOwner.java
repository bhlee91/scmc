package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.json.JSONObject;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DynamicInsert
@Table(name = "tb_member_cargoowner")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TbMemberCargoOwner {
	
	@Id
	@Column(name = "owner_uid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@Builder
	public TbMemberCargoOwner(String userId, String phoneNumber, String ownerName) {
		this.userId = userId;
		this.phoneNumber = phoneNumber;
		this.ownerName = ownerName;
	}
	
	@Builder
	public TbMemberCargoOwner(JSONObject cargoOwner) {
		this.userId = cargoOwner.getString("userId");
		this.phoneNumber = cargoOwner.getString("phoneNumber");
		this.ownerName = cargoOwner.getString("ownerName");
	}
}
