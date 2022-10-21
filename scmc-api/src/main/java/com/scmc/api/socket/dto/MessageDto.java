package com.scmc.api.socket.dto;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MessageDto {

	private String username;
	private String message;
	private Date date;
}
