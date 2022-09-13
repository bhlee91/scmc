package com.scmc.api.jpa.domain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

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
	private Date bannerEndDt;
	
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
	
	public TbCommonBanner(Map<String, Object> banner) throws ParseException {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		this.bannerId = Long.parseLong(banner.get("baannerId").toString());
		this.bannerStartDt = banner.get("bannerStartDt").equals("") ? null : format.parse(banner.get("bannerStartDt").toString());
		this.bannerEndDt = banner.get("bannerEndDt").equals("") ? null : format.parse(banner.get("bannerEndDt").toString());
		this.bannerName = banner.get("bannerName").toString();
		this.bannerDesc = banner.get("bannerDesc").toString();
		this.bannerUrl = banner.get("bannerUrl").toString();
		this.bannerExpdiv = banner.get("bannerExpdiv").toString();
		this.bannerWidth = Integer.parseInt(banner.get("bannerWidth").toString());
		this.bannerHeight = Integer.parseInt(banner.get("bannerHeight").toString());
		this.bannerHit = Integer.parseInt(banner.get("bannerHit").toString());
		this.bannerOrder = Integer.parseInt(banner.get("bannerOrder").toString());
		this.bannerImagePath = banner.get("bannerImagePath").toString();
		this.bannerUseyn = banner.get("bannerUseyn").toString();
		this.regId = banner.get("regId").toString();
		this.regDt = banner.get("regDt").equals("") ? null : format.parse(banner.get("regDt").toString());
		this.modId = banner.get("modId").toString();
		this.modDt = banner.get("modDt").equals("") ? null : format.parse(banner.get("modDt").toString());
	
	}
}
