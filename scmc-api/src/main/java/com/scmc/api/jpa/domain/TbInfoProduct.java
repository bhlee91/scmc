package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DynamicInsert @DynamicUpdate
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
	private Date regDt;
	
	@Column(name = "mod_dt")
	private Date modDt;
	
	@Builder(builderMethodName = "insertProductInfo")
	public TbInfoProduct(String productName, int price, int discountRate, 
			String productStartdt, String productEnddt, String useyn, String regId
		) throws ParseException {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		this.productName = productName;
		this.price = price;
		this.discountRate = discountRate;
		this.productStartdt = format.parse(productStartdt);
		this.productEnddt = format.parse(productEnddt);
		this.useyn = useyn;
		this.regId = regId;
		this.regDt = new Date();
	}
	
	public void updateProductInfo(String productName, int price, int discountRate, 
			String productStartdt, String productEnddt, String useyn
		) throws ParseException {
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		
		this.productName = productName;
		this.price = price;
		this.discountRate = discountRate;
		this.productStartdt = format.parse(productStartdt);
		this.productEnddt = format.parse(productEnddt);
		this.useyn = useyn;
		this.modDt = new Date();
	}
}
