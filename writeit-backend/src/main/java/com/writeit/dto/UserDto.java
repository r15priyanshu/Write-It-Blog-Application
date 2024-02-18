package com.writeit.dto;

import java.util.List;

import com.writeit.entities.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
	private int uid;
	private String name;
	private String username;
	private String password;
	private String about;
	private String profilepic;
	private String imageData;
	private List<Role> roles;
}
