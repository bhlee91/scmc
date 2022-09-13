package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_common_banner")
@Getter
@Setter
public class TbCommonBanner {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "banner_id")
	private Long bannerId;
	
	@Column(name = "banner_startdt")
	private Date bannerStartDt;
	
	@Column(name = "banner_enddt")
	private Date banneEndDt;
	
	@Column(name = "banner_name")
	private String bannerName;
	
	@Column(name = "banner_desc")
	private String bannerDesc;
	
	@Column(name = "banner_url")
	private String bannerUrl;
	
	@Column(name = "banner_expdiv")
	private String bannerExpdiv;
	
	@Column(name = "banner_width")
	private int bannerWidth;
	
	@Column(name = "banner_height")
	private int bannerHeight;
	
	@Column(name = "banner_hit")
	private int bannerHit;
	
	@Column(name = "banner_order")
	private int bannerOrder;
	
	@Column(name = "banner_image_path")
	private String bannerImagePath;
	
	@Column(name = "banner_useyn")
	private String bannerUseyn;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Date regDt;
	
	@Column(name = "mod_id")
	private String modId;
	
	@Column(name = "mod_dt")
	private Date modDt;
}
