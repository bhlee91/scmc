package com.scmc.api.jpa.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_member_truckowner")
@Getter @ToString
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TbMemberTruckOwner {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "truckowner_uid")
	private long truckownerUid;
	
	@Column(name = "car_number")
	private String carNumber;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "truckowner_name")
	private String truckownerName;
	
	@Column(name = "business_no")
	private String businessNo;
	
	@Column(name = "addr_st")
	private String addrSt;
	
	@Column(name = "addr_st2")
	private String addrSt2;
	
	@Column(name = "truck_tons")
	private String truckTons;
	
	@Column(name = "longyn")
	private String longyn;
	
	@Column(name = "refrigerated_frozen")
	private String refrigeratedFrozen;
	
	@Column(name = "stowage_type")
	private String stowageType;
	
	@Column(name = "lift_type")
	private String liftType;
	
	@Column(name = "password_expireddate")
	private Date passwordExpireddate;
	
	@Column(name = "pwd_failcount")
	private int pwdFailcount;
	
	@Column(name = "unregister_yn")
	private String unregisterYn;
	
	@Column(name = "freeyn")
	private String freeyn;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "tbMemberTruckOwner", fetch = FetchType.LAZY)
	private List<TbCargoHist> hist = new ArrayList<TbCargoHist>(); 
	
	@Builder
	public TbMemberTruckOwner(
			long truckownerUid, String carNumber, String phoneNumber, String password,
			String truckownerName, String businessNo, String truckTons, String longYn, 
			String refrigeratedFrozen, String stowageType, String liftType
	) {
		this.truckownerUid = truckownerUid;
		this.carNumber = carNumber;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.truckownerName = truckownerName;
		this.businessNo = businessNo;
		this.truckTons = truckTons;
		this.longyn = longYn;
		this.refrigeratedFrozen = refrigeratedFrozen;
		this.stowageType = stowageType;
		this.liftType = liftType;
	}
}
