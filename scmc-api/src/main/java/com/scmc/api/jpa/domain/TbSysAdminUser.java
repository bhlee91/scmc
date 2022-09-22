package com.scmc.api.jpa.domain;

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
import lombok.ToString;

@Entity
@DynamicInsert @DynamicUpdate
@Table(name = "tb_sys_adminuser")
@Getter
@Setter
@ToString
@NoArgsConstructor
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
	
	@Builder(builderMethodName = "loginBuilder")
	public TbSysAdminUser(String email) {
		this.email = email;
	}
	
	@Builder(builderMethodName = "signupBuilder")
	public TbSysAdminUser(String email, String passwd, int passwdFailCnt) {
		this.email = email;
		this.passwd = passwd;
		this.passwdFailCnt = passwdFailCnt;
	}
	
	public void successLogin() {
		this.passwdFailCnt = 0;
	}
	
	public void addPasswdFailCnt(int passwdFailCnt) {
		this.passwdFailCnt = passwdFailCnt;
	}
}
