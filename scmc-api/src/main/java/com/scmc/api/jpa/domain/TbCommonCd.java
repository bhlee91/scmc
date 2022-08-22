package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Table(name = "tb_common_cd")
@Getter
public class TbCommonCd {
	
	@Id
	@Column(name = "cdid")
	private String cdid;
	
	@Column(name = "code_type")
	private String code_type;
	
	@Column(name = "code_name")
	private String code_name;
	
	@Column(name = "code_typename")
	private String code_typename;
	
	@Column(name = "sort_order")
	private int sort_order;
	
	@Column(name = "bigo")
	private String bigo;
	
	@Column(name = "use_yn")
	private String use_yn;
	
	@Column(name = "reg_id")
	private String reg_id;
	
	@Column(name = "reg_dt")
	private Date reg_dt;
	
	@Column(name = "mod_id")
	private String mod_id;
	
	@Column(name = "mod_dt")
	private Date mod_dt;
}
