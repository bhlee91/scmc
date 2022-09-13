package com.scmc.api.common.jwt;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Component
@Slf4j
public class JwtTokenProvider {
	
	@Value("${app.jwt-secret}")
	private String secretKey;
	
	@Value("${app.jwt-expired-time:0}")
	private int tokenValidTime; // 1시간
	
	private final CustomUserDetailsService customUserDetailsService;
	
	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}
	
	// JWT 토큰 생성
	public String createToken(HashMap<String, Object> info) {
		Claims claims = Jwts.claims().setSubject(info.get("userId").toString());
		
		Date now = new Date();
		
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + tokenValidTime))
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
	}
	
	// JWT 토큰에서 인증 정보 조회
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = customUserDetailsService.loadUserByUsername(this.getUserIdFromJwt(token));
		
		return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), "1234", userDetails.getAuthorities());
	}
	
	// 토큰에서 회원 정보 추출
	public String getUserIdFromJwt(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}
	
	// 토큰의 유효성 + 만료 확인
	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (SignatureException ex) {
            log.error("유효하지 않은 JWT signature");
            throw new JwtException("유효하지 않은 JWT signature", ex);
        } catch (MalformedJwtException ex) {
            log.error("유효하지 않은 JWT token");
            throw new JwtException("유효하지 않은 JWT token", ex);
        } catch (ExpiredJwtException ex) {
            log.error("JWT token 유효시간이 만료됨");
            throw new JwtException("JWT token 유효시간이 만료됨", ex);
        } catch (UnsupportedJwtException ex) {
            log.error("제공되지 않는 JWT token");
            throw new JwtException("제공되지 않는 JWT token", ex);
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw new JwtException("JWT claims string is empty", ex);
        }
	}
}
