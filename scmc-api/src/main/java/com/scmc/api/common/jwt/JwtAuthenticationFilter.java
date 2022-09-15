package com.scmc.api.common.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtTokenProvider jwtTokenProvider;
	
	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		try {
			// 헤더에서 JWT를 받아옴
			String token = getJwtToken(request);
			
			if (StringUtils.hasText(token) && jwtTokenProvider.validateToken(token)) {
				Authentication authentication = jwtTokenProvider.getAuthentication(token);
				
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} 
		} catch (Exception e) {
			log.error("Could not set user authentication in security context", e);
		}
		
		filterChain.doFilter(request, response);
	}
	
	// Request의 Header에서 토큰 값을 가져옴. "Authorization": "TOKEN 값"
	private String getJwtToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}

}
