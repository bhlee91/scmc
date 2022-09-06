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
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_truckowner_payment")
@Getter
@Setter
@NoArgsConstructor
public class TbTruckOwnerPayment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pay_uid")
	private Long payUid;
	
	@Column(name = "truckowner_uid")
	private Long truckownerUid;
	
	@Column(name = "product_uid")
	private Long productUid;
	
	@Column(name = "free_startdt")
	private Date freeStartDt;
	
	@Column(name = "free_enddt")
	private Date freeEndDt;
	
	@Column(name = "pay_type")
	private String payType;
	
	@Column(name = "svc_startdt")
	private Date svcStartDt;
	
	@Column(name = "svc_enddt")
	private Date svcEndDt;
	
	@Column(name = "grace_day")
	private int graceDay;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	public TbTruckOwnerPayment(Map<String, Object> pm) throws ParseException{
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		
		this.payUid = Long.parseLong(pm.get("payUid").toString());
		this.truckownerUid = Long.parseLong(pm.get("truckownerUid").toString());
		this.productUid = Long.parseLong(pm.get("productUid").toString());
		this.freeStartDt = pm.get("freeStartDt").toString().equals("")? null : format.parse(pm.get("freeStartDt").toString());
		this.freeEndDt = pm.get("freeEndDt").toString().equals("")? null : format.parse(pm.get("freeEndDt").toString());
		this.svcStartDt = pm.get("svcStartDt").toString().equals("")? null : format.parse(pm.get("svcStartDt").toString());
		this.svcEndDt = pm.get("svcEndDt").toString().equals("")? null : format.parse(pm.get("svcEndDt").toString());
		this.graceDay = Integer.parseInt(pm.get("graceDay").toString());
	}
}
