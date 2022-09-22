package com.scmc.api.jpa.domain;

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
import javax.persistence.Transient;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_cargo_image")
@Getter @Setter
@NoArgsConstructor
public class TbCargoImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private Long imageId;
	
	@Column(name = "mem_div")
	private String memDiv;
	
	@Column(name = "image_seq")
	private int imageSeq;
	
	@Column(name = "image_contents")
	private byte[] imageContents;
	
	@Transient
	private String contents;
	
	@Column(name = "regDt")
	private Date regDt;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonProperty("request")
	@JsonBackReference
	@JoinColumn(name= "req_id", referencedColumnName = "req_id")
	private TbCargoRequest tbCargoRequest;
	
	public TbCargoImage(Map<String, Object> request) { 
		this.memDiv = request.get("memDiv").toString();
		this.imageSeq = Integer.parseInt(request.get("seq").toString());
		this.imageContents = request.get("contents").toString().getBytes();
	}
	
}