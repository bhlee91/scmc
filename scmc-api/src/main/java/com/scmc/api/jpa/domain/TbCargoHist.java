package com.scmc.api.jpa.domain;

import java.text.ParseException;
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

import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@DynamicInsert
@Table(name = "tb_cargo_history")
@Getter
@Setter
@NoArgsConstructor
public class TbCargoHist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "hist_uid")
	private Long histUid;
	
	@OneToOne	
	@JoinColumn(name = "req_id", referencedColumnName = "req_id")
	@ToString.Exclude
	private TbCargoRequest request;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@OneToOne
	@JoinColumn(name = "truckowner_uid", referencedColumnName = "truckowner_uid")
	//@JsonIgnore
	@ToString.Exclude
	private TbMemberTruckOwner truckowner;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	public TbCargoHist(Map<String, Object> hist) throws ParseException {
		
		this.request = (TbCargoRequest) hist.get("request");
		this.ownerUid = this.request.getOwnerUid();
		this.truckowner = (TbMemberTruckOwner) hist.get("truckowner");
		this.status = hist.get("status").toString();
	}
	
	public TbCargoHist(TbCargoRequest request, TbMemberTruckOwner truckowner, String status) {
		this.request = request;
		this.ownerUid = request.getOwnerUid();
		this.truckowner = truckowner;
		this.status = status;
	}
}
