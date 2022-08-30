package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_cargo_history")
@Getter
public class TbCargoHist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hist_uid")
	private Long histUid;
	
	@Column(name = "req_id")
	private Long reqId;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@Column(name = "truckowner_uid")
	private Long truckOwnerUid;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
}
