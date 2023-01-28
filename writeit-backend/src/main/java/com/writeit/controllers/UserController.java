package com.writeit.controllers;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.hibernate.engine.jdbc.StreamUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.writeit.dto.UserDto;
import com.writeit.entities.User;
import com.writeit.exceptions.ApiResponse;
import com.writeit.exceptions.CustomException;
import com.writeit.services.FileService;
import com.writeit.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	@Value("${writeit.images.userprofiles}")
	String userprofileimagepath;
	
	@Autowired
	UserService userService;
	
	@Autowired
	FileService fileService;

	@Autowired
	ModelMapper modelMapper;

	// GET SINGLE USER
	@GetMapping("/users/{username}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable String username) {
		User user = userService.getUserByUsername(username);
		return new ResponseEntity<UserDto>(modelMapper.map(user, UserDto.class), HttpStatus.OK);
	}

	// SERVE USER IMAGE
	@GetMapping(value = "/images/serveuserimage/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void serveImage(@PathVariable("imagename") String imagename, HttpServletResponse response) {

		try {
			InputStream is = fileService.serveImage(userprofileimagepath, imagename);
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(is, response.getOutputStream());

		} catch (FileNotFoundException e) {
			throw new CustomException("File Not Found with the name:" + imagename, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// UPDATE SINGLE USER
	@PutMapping("/users/{username}")
	public ResponseEntity<UserDto> updateSingleUser(@RequestBody User user, @PathVariable String username) {
		User updateduser = userService.updateUserByUsername(user, username);
		return new ResponseEntity<UserDto>(modelMapper.map(user, UserDto.class), HttpStatus.OK);
	}

	// DELETE SINGLE USER
	@DeleteMapping("/users/{username}")
	public ResponseEntity<ApiResponse> deleteSingleUser(@PathVariable String username) {
		userService.deleteUserByUsername(username);
		ApiResponse apiResponse = new ApiResponse("User Successfully Deleted with username :" + username,
				LocalDateTime.now(), HttpStatus.OK, HttpStatus.OK.value());
		return new ResponseEntity<>(apiResponse, HttpStatus.OK);
	}

	// CREATE NEW USER
	@PostMapping("/users")
	public ResponseEntity<UserDto> addNewUser(@Valid @RequestBody User User) {
		User createdUser = userService.createUser(User);
		return new ResponseEntity<UserDto>(modelMapper.map(createdUser, UserDto.class), HttpStatus.CREATED);
	}

	// GET ALL USERS
	@GetMapping("/users")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		List<UserDto> allUsers = userService.getAllUsers().stream().map(user -> modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
		return new ResponseEntity<>(allUsers, HttpStatus.OK);
	}
}
