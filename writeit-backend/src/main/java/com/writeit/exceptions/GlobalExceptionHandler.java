package com.writeit.exceptions;

import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<ApiResponse> handleCustomException(CustomException ex)
	{
		return new ResponseEntity<ApiResponse>(new ApiResponse(ex.getMessage(),ex.getTimestamp(),ex.getStatus(),ex.getStatus().value()),ex.getStatus());
	}
	
	//Related to Spring data jpa @Valid Annotation
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public HashMap<Object,Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex,HttpServletResponse response)
	{
		HashMap<Object,Object> hm=new HashMap<>();
		hm.put("status",HttpStatus.BAD_REQUEST);
		hm.put("statuscode",HttpStatus.BAD_REQUEST.value());
		
		HashMap<Object,Object> errors=new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((e)->errors.put(((FieldError)e).getField(), e.getDefaultMessage()));
		hm.put("errors",errors);
		response.setStatus(HttpStatus.BAD_REQUEST.value());
		return hm;
	}
}
