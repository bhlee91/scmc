package com.scmc.api.jpa.domain;

import java.util.Date;

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
@Table(name = "tb_info_product")
@Getter
@Setter
@NoArgsConstructor
public class TbInfoProduct {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_uid")
	private Long productUid;
	
	@Column(name = "product_name")
	private String productName;
	
	@Column(name = "price")
	private int price;
	
	@Column(name = "discount_rate")
	private int discountRate;
	
	@Column(name = "product_startdt")
	private Date productStartdt;
	
	@Column(name = "product_enddt")
	private Date productEnddt;
	
	@Column(name = "useyn")
	private String useyn;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date RegDt;
	
	@Column(name = "mod_dt")
	private Date modDt;

}
