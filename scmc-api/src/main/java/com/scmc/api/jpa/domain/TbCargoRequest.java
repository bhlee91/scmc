package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.scmc.api.cargoreq.dto.RequestDto;
import com.scmc.api.common.utils.CommonUtil;

import lombok.Getter;
import lombok.Setter;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_cargo_request")
@Getter
@Setter
public class TbCargoRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "req_id")
	private Long reqId;
	
	@Column(name = "owner_uid")
	private Long ownerUid;
	
	@Column(name = "cargo_name")
	private String cargoName;
	
	@Column(name = "truck_type")
	private String truckType;
	
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
	private Float departLatitude;
	
	@Column(name = "depart_longitude")
	private Float departLongitude;
	
	@Column(name = "arrival_latitude")
	private Float arrivalLatitude;
	
	@Column(name = "arrival_longitude")
	private Float arrivalLongitude;
	
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
	
	@Column(name = "direct_distance", nullable = true)
	private Float directDistance;
	
	@Column(name = "real_distance", nullable = true)
	private Float realDistance;
	
	// 상태명
	@Formula("(SELECT com.code_name FROM tb_common_cd com WHERE com.cdid = status)")
	private String statusName;
	
	// 상차방법
	@Formula("(SELECT com.code_name FROM tb_common_cd com WHERE com.cdid = load_method)")
	private String loadMethodName;

	// 하차방법
	@Formula("(SELECT com.code_name FROM tb_common_cd com WHERE com.cdid = unload_method)")
	private String unloadMethodName;
	
	@Formula("(SELECT cargo.owner_name FROM tb_member_cargoowner cargo WHERE cargo.owner_uid = owner_uid)")
	private String cargoownerName;
	
	// 상세보기
	@Transient
	private boolean expanded = false;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "tbCargoRequest", fetch = FetchType.LAZY)
	@OrderBy("mem_div asc, method_div asc, image_seq asc")
	private List<TbCargoImage> images = new ArrayList<TbCargoImage>();
	
	@Transient
	private List<TbCargoImage> cargoImages = new ArrayList<TbCargoImage>();
	@Transient
	private List<TbCargoImage> loadImages = new ArrayList<TbCargoImage>();
	@Transient
	private List<TbCargoImage> unloadImages = new ArrayList<TbCargoImage>();
	
	public TbCargoRequest() {}
	
	public TbCargoRequest(RequestDto dto) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		this.reqId = dto.getReqId();
		this.ownerUid = dto.getOwnerUid();
		this.cargoName = dto.getCargoName();
		this.truckType = dto.getTruckType();
		this.cweight = dto.getCweight();
		this.cheight = dto.getCheight();
		this.cwidth = dto.getCwidth();
		this.cverticalreal = dto.getCverticalreal();
		this.departDatetimes = dto.getDepartDatetimes();
		this.arrivalDatetimes = dto.getArrivalDatetimes();
		this.departAddrSt = dto.getDepartAddrSt();
		this.departAddrSt2 = dto.getDepartAddrSt2();
		this.departAddrOld = dto.getDepartAddrOld();
		this.arrivalAddrSt = dto.getArrivalAddrSt();
		this.arrivalAddrSt2 = dto.getArrivalAddrSt2();
		this.arrivalAddrOld = dto.getArrivalAddrOld();
		this.receiverPhone = dto.getReceiverPhone();
		this.departLatitude = dto.getDepartLatitude();
		this.departLongitude = dto.getDepartLongitude();
		this.arrivalLatitude = dto.getArrivalLatitude();
		this.arrivalLongitude = dto.getArrivalLongitude();
		this.loadMethod = dto.getLoadMethod();
		this.unloadMethod = dto.getUnloadMethod();
		this.requestItems = dto.getRequestItems();
		this.transitFare = dto.getTransitFare();
		this.additionalFare = dto.getAdditionalFare();
		this.status = dto.getStatus();
		this.regComDate = dto.getRegComDate();
		
		this.directDistance = dto.getDirectDistance();
		this.realDistance = dto.getRealDistance();
		
		this.modDt = format.parse(CommonUtil.getNowDate().toString());
	}

}
