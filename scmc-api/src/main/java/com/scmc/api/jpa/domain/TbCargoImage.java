package com.scmc.api.jpa.domain;

import java.util.Date;

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
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Entity
@Table(name = "tb_cargo_image")
@Getter
public class TbCargoImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private Long imageId;
	
//	@Column(name = "req_id")
//	private Long reqId;
	
	@Column(name = "mem_div")
	private String memDiv;
	
	@Column(name = "image_seq")
	private int imageSeq;
	
	@Column(name = "image_contents")
	private byte[] imageContents;
	
	@Column(name = "regDt")
	private Date regDt;
		
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonProperty("req_id")
	@JoinColumn(name= "req_id", referencedColumnName = "req_id")
	private TbCargoRequest tbCargoRequest;
	
}