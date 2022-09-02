package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

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
	
	public TbCargoHist(Map<String, Object> hist) throws ParseException {
		
		this.reqId = Long.parseLong(hist.get("reqId").toString());
		this.ownerUid = Long.parseLong(hist.get("ownerUid").toString());
		this.truckOwnerUid = Long.parseLong(hist.get("truckOwnerUid").toString());
		this.status = hist.get("status").toString();
	}

	
}
