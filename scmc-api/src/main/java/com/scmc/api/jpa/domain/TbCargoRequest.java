package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_cargo_request")
@Getter
@Setter
@NoArgsConstructor
public class TbCargoRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "req_id")
	private Long reqId;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@Column(name = "cargo_name")
	private String cargoName;
	
	@Column(name = "truck_uid")
	private Long truckUid;
	
	@Column(name = "cweight")
	private float cweight;
	
	@Column(name = "cheight")
	private float cheight;
	
	@Column(name = "cwidth") 
	private float cwidth;
	
	@Column(name = "cverticalreal")
	private float cverticalreal;
	
	@Column(name = "depart_datetimes")
	private Date departDatetimes;
	
	@Column(name = "arrival_datetimes")
	private Date arrivalDatetimes;
	
	@Column(name = "depart_addr_st")
	private String departAddrSt;
	
	@Column(name = "depart_addr_st2")
	private String departAddrSt2;
	
	@Column(name = "depart_addr_old")
	private String departAddrOld;
	
	@Column(name = "depart_addr_old2")
	private String departAddrOld2;
	
	@Column(name = "arrival_addr_st")
	private String arrivalAddrSt;
	
	@Column(name = "arrival_addr_st2")
	private String arrivalAddrSt2;
	
	@Column(name = "arrival_addr_old")
	private String arrivalAddrOld;
	
	@Column(name = "arrival_addr_old2")
	private String arrivalAddrOld2;
	
	@Column(name = "receiver_phone")
	private String receiverPhone;
	
	@Column(name = "depart_latitude")
	private String departLatitude;
	
	@Column(name = "depart_longitude")
	private String departLongitude;
	
	@Column(name = "arrival_latitude")
	private String arrivalLatitude;
	
	@Column(name = "arrival_longitude")
	private String arrivalLongitude;
	
	@Column(name = "load_method")
	private String loadMethod;
	
	@Column(name = "unload_method")
	private String unloadMethod;
	
	@Column(name = "request_items")
	private String requestItems;
	
	@Column(name = "transit_fare")
	private int transitFare;
	
	@Column(name = "additional_fare")
	private int additionalFare;
	
	@Column(name = "req_comyn")
	private String reqComyn;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "reg_com_date")
	private Date regComDate;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	// 상태명
	@Transient
	private String statusName;
	
	// 상세보기
	@Transient
	private boolean expanded = false;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "tbCargoRequest", fetch = FetchType.LAZY)
	@OrderBy("image_seq asc")
	private List<TbCargoImage> images = new ArrayList<TbCargoImage>();
	
	public TbCargoRequest(Map<String, Object> request) throws ParseException {
		SimpleDateFormat formatToMin = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		this.ownerUid = Long.parseLong(request.get("ownerUid").toString());
		this.cargoName = request.get("cargoName").toString();
		this.truckUid = Long.parseLong(request.get("truckUid").toString());
		this.cweight = Float.parseFloat(request.get("cweight").toString());
		this.cheight = Float.parseFloat(request.get("cheight").toString());
		this.cwidth = Float.parseFloat(request.get("cwidth").toString());
		this.cverticalreal = Float.parseFloat(request.get("cverticalreal").toString());
		this.departDatetimes = request.get("departDatetimes").equals("") ? null : formatToMin.parse(request.get("departDatetimes").toString());
		this.arrivalDatetimes = request.get("arrivalDatetimes").equals("") ? null : formatToMin.parse(request.get("arrivalDatetimes").toString());
		this.departAddrSt = request.get("departAddrSt").toString();
		this.departAddrOld = request.get("departAddrOld").toString();
		this.arrivalAddrSt = request.get("arrivalAddrSt").toString();
		this.arrivalAddrOld = request.get("arrivalAddrOld").toString();
		this.receiverPhone = request.get("receiverPhone").toString();
		this.departLatitude = request.get("departLatitude").toString();
		this.departLongitude = request.get("departLongitude").toString();
		this.arrivalLatitude = request.get("arrivalLatitude").toString();
		this.arrivalLongitude = request.get("arrivalLongitude").toString();
		this.loadMethod = request.get("loadMethod").toString();
		this.unloadMethod = request.get("unloadMethod").toString();
		this.requestItems = request.get("requestItems").toString();
		this.transitFare = Integer.parseInt(request.get("transitFare").toString());
		this.additionalFare = Integer.parseInt(request.get("additionalFare").toString());
		this.status = request.get("status").toString();
		this.regComDate = format.parse(request.get("regComDate").toString());
	}

}
