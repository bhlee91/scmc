package com.scmc.api.common.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.scmc.api.jpa.domain.TbMemberSmsauth;
import com.scmc.api.jpa.domain.TbSysSmslog;
import com.scmc.api.jpa.repository.TbMemberSmsauthRepository;
import com.scmc.api.jpa.repository.TbSysSmslogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HiWorksUtil {
	
	private final APIUtil apiUtil;
	private final TbMemberSmsauthRepository tbMemberSmsauthRepository;
	private final TbSysSmslogRepository tbSysSmslogRepository;

	@Value("${hiworks.api.office-token}")
	private String TOKEN;
	
	@Value("${hiworks.api.sms}")
	private String SMS_URL;
	
	/*
	 * sms body
	 * user_id: "megasys"
	 * sms_type: "S"
	 * sender: "{보내는 번호}"
	 * receiver: "{받는 사람 번호}"
	 * subject: "{제목}"
	 * message: "{본문}"
	 * send_date: "{보내는 날짜}"
	 * file: "{첨부파일}"
	 */
	public String sendSms(LinkedHashMap<String, String> sms) throws UnsupportedEncodingException {
		HttpURLConnection con = apiUtil.connect(SMS_URL);
		
		try {
			String authNumber = getSmsAuthNumber();
			String sendDate = CommonUtil.getNowDate();
			
			sms.put("subject", "문자 발송 테스트");
			sms.put("message", String.format("[%s] 꿀차 인증번호입니다.\n해당 입력 칸에 정확하게 입력해주세요.", authNumber));
			sms.put("send_date", sendDate);
			sms.put("file", "");
			
			String requestBody = CommonUtil.getJsonToStringFromMap(sms);
			
			con.setConnectTimeout(5000);
			con.setRequestMethod("POST");
			con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			con.setRequestProperty("Authorization", "Bearer " + TOKEN);
			con.setDoOutput(true);
			
			try (OutputStream os = con.getOutputStream()) {
				byte request_data[] = requestBody.getBytes("utf-8");	
				os.write(request_data);
				os.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			con.connect();
			
			int responseCode = con.getResponseCode();
			
			String result;
			
			if (responseCode == HttpURLConnection.HTTP_OK) {
				saveSmsAuth(sms, authNumber);
				result = apiUtil.readBody(con.getInputStream());
			} else {
				result = apiUtil.readBody(con.getInputStream());
			}
			
			return result;
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}
	
	private String getSmsAuthNumber() {
		Random rand = new Random();
		String authNumber = "";
		
		for(int i = 0; i < 4; i++) {
			authNumber = authNumber + rand.nextInt(10) + ""; 
		}
		
		return authNumber;
	}

	@Transactional
	private void saveSmsAuth(LinkedHashMap<String, String> sms, String authNumber) {
		TbMemberSmsauth tmsa = new TbMemberSmsauth();
		tmsa.setPhoneNumber(sms.get("receiver"));
		tmsa.setAuthNumber(authNumber);
		tmsa.setRegDt(Timestamp.valueOf(sms.get("send_date")));
		
		long smsId = tbMemberSmsauthRepository.save(tmsa).getSmsId();
		
		TbSysSmslog tssl = TbSysSmslog.builder()
							.smsId(smsId)
							.smsType("AU")
							.senderNumber(sms.get("sender"))
							.receiverNumber(sms.get("receiver"))
							.title(sms.get("subject"))
							.msg(sms.get("message"))
							.msgType("01")
							.successCount(1)
							.regDt(Timestamp.valueOf(sms.get("send_date")))
							.build();
		
		tbSysSmslogRepository.save(tssl);
	}
}
