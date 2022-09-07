package com.scmc.api.jpa.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.DynamicInsert;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@DynamicInsert
@Table(name = "tb_member_smsauth")
@Getter @Setter @ToString
public class TbMemberSmsauth {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sms_id")
	private long smsId;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "auth_number")
	private String authNumber;
	
	@Column(name = "reg_dt")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDt;
	
}
