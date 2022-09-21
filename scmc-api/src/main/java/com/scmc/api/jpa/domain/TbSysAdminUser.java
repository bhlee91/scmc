package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;

import lombok.Builder;
import lombok.Getter;

@Entity
@DynamicInsert
@Table(name = "tb_sys_adminuser")
@Getter
@Builder
public class TbSysAdminUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "admin_uid")
	private Long id;
	
	private String email;
	
	private String passwd;
	
	@Column(name = "passwd_valid_date")
	private Date passwdValidDate;
	
	@Column(name = "passwd_fail_cnt")
	private int passwdFailCnt;
	
	private String status;
	
	@Column(name = "reg_dt")
	private Date regDt;
}
