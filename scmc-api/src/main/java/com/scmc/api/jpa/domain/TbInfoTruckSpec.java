package com.scmc.api.jpa.domain;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_info_truckspec")
@Getter
@NoArgsConstructor
public class TbInfoTruckSpec {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "t_uid")
	private Long id;
	
	@Column(name = "t_type")
	private String type;
	
	@Column(name = "t_name")
	private String name;
	
	@Column(name = "manufacturer")
	private String manufacturer;
	
	@Column(name = "t_wide")
	private int wide;
	
	@Column(name = "t_length")
	private int length;
	
	@Column(name = "t_lowheight")
	private int lowheight;
	
	@Column(name = "t_top_height")
	private int topHeight;
	
	@Column(name = "t_availton")
	private int availton;
	
	@Column(name = "longyn")
	private String longYn;
	
	@Column(name = "refrigerated_frozen")
	private String refrigeratedFrozen;
	
	@Column(name = "stowage_type")
	private String stowageType;
	
	@Column(name = "lift_type")
	private String liftType;
	
	@Column(name = "use_yn")
	private String useYn;
	
	@Column(name = "reg_id")
	private String regId;
	
	@Column(name = "reg_dt")
	private Timestamp regDt;
	
	@Column(name = "mod_id")
	private String modId;
	
	@Column(name = "mod_dt")
	private Timestamp modDt;
}
