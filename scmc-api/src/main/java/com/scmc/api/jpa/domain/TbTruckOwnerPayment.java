package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "truckowner_uid")
	@JsonBackReference
	private TbMemberTruckOwner truckownerUid;
	
	@OneToOne
	@JoinColumn(name = "product_uid")
	private TbInfoProduct product;
	
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
		this.truckownerUid = (TbMemberTruckOwner)pm.get("truckownerUid");
		this.product = (TbInfoProduct)pm.get("productUid");
		this.freeStartDt = pm.get("freeStartDt").toString().equals("")? null : format.parse(pm.get("freeStartDt").toString());
		this.freeEndDt = pm.get("freeEndDt").toString().equals("")? null : format.parse(pm.get("freeEndDt").toString());
		this.svcStartDt = pm.get("svcStartDt").toString().equals("")? null : format.parse(pm.get("svcStartDt").toString());
		this.svcEndDt = pm.get("svcEndDt").toString().equals("")? null : format.parse(pm.get("svcEndDt").toString());
		this.graceDay = Integer.parseInt(pm.get("graceDay").toString());
	}
}
