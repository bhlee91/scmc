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

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@DynamicInsert
@Table(name = "tb_sys_smslog")
@Getter @ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TbSysSmslog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "sms_log_id")
	private long smsLogId;
	
	@Column(name = "sms_id")
	private long smsId;
	
	@Column(name = "sms_type")
	private String smsType;
	
	@Column(name = "sender_number")
	private String senderNumber;
	
	@Column(name = "receiver_number")
	private String receiverNumber;
	
	@Column(name = "msg")
	private String msg;
	
	@Column(name = "msg_type")
	private String msgType;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "test_yn")
	private String testYn;
	
	@Column(name = "result_code")
	private String resultCode;
	
	@Column(name = "msg_id")
	private int msgId;
	
	@Column(name = "success_count")
	private int successCount;
	
	@Column(name = "reg_dt")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDt;
	
	@Column(name = "auth_number")
	private String authNumber;
	
	@Builder
	public TbSysSmslog(
			long smsId, String smsType, String senderNumber, String receiverNumber,
			String msg, String msgType, String title, int successCount, Date regDt,
			String authNumber
		) {
		this.smsId = smsId;
		this.smsType = smsType;
		this.senderNumber = senderNumber;
		this.receiverNumber = receiverNumber;
		this.msg = msg;
		this.msgType = msgType;
		this.title = title;
		this.testYn = "Y";
		this.resultCode = "200";
		this.msgId = 1;
		this.successCount = 1;
		this.regDt = regDt;
		this.authNumber = authNumber;
	}
}
