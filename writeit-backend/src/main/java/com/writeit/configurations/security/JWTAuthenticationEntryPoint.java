/*
package com.writeit.configurations.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


@Component
public class JWTAuthenticationEntryPoint implements AuthenticationEntryPoint {

	//this methods run when someone tries to access api but is not authorized ( let say without a valid token,or username or password etc )
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		System.out.println("Inside Commence() of JWTAuthenticationEntryPoint class !! ");
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Access is Denied !! ");
	}

}
*/
