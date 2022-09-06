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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_cargo_history")
@Getter
@Setter
@NoArgsConstructor
public class TbCargoHist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hist_uid")
	private Long histUid;
	
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)	
	@JoinColumn(name = "req_id", referencedColumnName = "req_id")
	private TbCargoRequest reqId;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "truckowner_uid", referencedColumnName = "truckowner_uid")
	@JsonBackReference
	private TbMemberTruckOwner tbMemberTruckOwner;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	public TbCargoHist(Map<String, Object> hist) throws ParseException {
		
		this.reqId = (TbCargoRequest) hist.get("reqId");
		this.ownerUid = Long.parseLong(hist.get("ownerUid").toString());
		this.tbMemberTruckOwner = (TbMemberTruckOwner) hist.get("tbMemberTruckOwner");
		this.status = hist.get("status").toString();
	}

	
}
