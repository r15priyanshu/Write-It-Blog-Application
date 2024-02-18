package com.writeit.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.tika.Tika;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

import com.writeit.constants.GlobalConstants;
import com.writeit.dto.UserDto;
import com.writeit.entities.User;
import com.writeit.exceptions.ApiResponse;
import com.writeit.exceptions.CustomException;
import com.writeit.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper modelMapper;

	// GET SINGLE USER
	@GetMapping("/users/{username}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable String username) {
		User user = userService.getUserByUsername(username);
		return new ResponseEntity<UserDto>(modelMapper.map(user, UserDto.class), HttpStatus.OK);
	}

	// SERVE USER IMAGE
	@GetMapping(value = "/images/serveuserimage/{username}")
	public ResponseEntity<byte[]> serveUserProfileImage(@PathVariable("username") String username) {
		User foundUser = userService.getUserByUsername(username);
		if (foundUser.getProfilepic().equals(GlobalConstants.DEFAULT_PROFILE_IMAGE_NAME)) {
			throw new CustomException("Default Image is Set , Will Be Taken from frontend : "
					+ GlobalConstants.DEFAULT_PROFILE_IMAGE_NAME, HttpStatus.OK);
		}
		// Detect MIME type of image data
		String contentType = new Tika().detect(foundUser.getImageData());
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType(contentType));
		return new ResponseEntity<>(foundUser.getImageData(), headers, HttpStatus.OK);
	}

	// UPDATE SINGLE USER
	@PutMapping("/users/{username}")
	public ResponseEntity<UserDto> updateSingleUser(@RequestBody User user, @PathVariable String username) {
		User updateduser = userService.updateUserByUsername(user, username);
		return new ResponseEntity<UserDto>(modelMapper.map(updateduser, UserDto.class), HttpStatus.OK);
	}

	// DELETE ALL USERS
	@DeleteMapping("/users")
	public ResponseEntity<ApiResponse> deleteAllUsers() {
		userService.deleteAllUsers();
		ApiResponse apiResponse = new ApiResponse("All Users Deleted Successfully !!", LocalDateTime.now(),
				HttpStatus.OK, HttpStatus.OK.value());
		return new ResponseEntity<>(apiResponse, HttpStatus.OK);
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
