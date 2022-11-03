package com.scmc.api.cargoreq.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.scmc.api.jpa.domain.TbCargoRequest;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestDto {

	private Long reqId;
	private Long ownerUid;
	private String cargoownerName;
	private String cargoName;
	private Long truckUid;
	
	private float cweight;
	private float cheight;
	private float cwidth;
	private float cverticalreal;
	
	private Date departDatetimes;
	private Date arrivalDatetimes;
	
	private String departAddrSt;
	private String departAddrSt2;
	private String departAddrOld;
	private String arrivalAddrSt;
	private String arrivalAddrSt2;
	private String arrivalAddrOld;
	private String receiverPhone;
	private float departLatitude;
	private float departLongitude;
	private float arrivalLatitude;
	private float arrivalLongitude;
	
	private String loadMethod;
	private String unloadMethod;
	
	private String requestItems;
	
	private int transitFare;
	private int additionalFare;
	
	private String reqComyn;
	private String status;
	private String statusName;
	
	private Date regComDate;
	private Date modDt;
	
	private List<ImageDto> imageList = new ArrayList<ImageDto>();

	public RequestDto(TbCargoRequest request) {
		super();
		
		this.reqId = request.getReqId();
		this.ownerUid = request.getOwnerUid();
		this.cargoownerName = request.getCargoownerName(); 
		this.cargoName = request.getCargoName();
		this.truckUid = request.getTruckUid();
		this.cweight = request.getCweight();
		this.cheight = request.getCheight();
		this.cwidth = request.getCwidth();
		this.cverticalreal = request.getCverticalreal();
		this.departDatetimes = request.getDepartDatetimes();
		this.arrivalDatetimes = request.getArrivalDatetimes();
		this.departAddrSt = request.getDepartAddrSt();
		this.arrivalAddrSt = request.getArrivalAddrSt();
		this.receiverPhone = request.getReceiverPhone();
		this.departLatitude = request.getDepartLatitude();
		this.departLongitude = request.getDepartLongitude();
		this.arrivalLatitude = request.getArrivalLatitude();
		this.arrivalLongitude = request.getArrivalLongitude();
		this.loadMethod = request.getLoadMethod();
		this.unloadMethod = request.getUnloadMethod();
		this.requestItems = request.getRequestItems();
		this.transitFare = request.getTransitFare();
		this.additionalFare = request.getAdditionalFare();
		this.status = request.getStatus();
		this.statusName = request.getStatusName();
	}
}
