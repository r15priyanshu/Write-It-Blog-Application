package com.writeit.services;

import java.util.List;

import com.writeit.entities.User;
public interface UserService {
	User createUser(User user);
	User updateUserByUsername(User user,String username);
	User getUserByUsername(String username);
	boolean deleteUserByUsername(String username);
	List<User> getAllUsers();
}
