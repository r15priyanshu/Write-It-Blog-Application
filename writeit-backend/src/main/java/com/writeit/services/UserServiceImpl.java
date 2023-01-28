package com.writeit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.writeit.entities.User;
import com.writeit.exceptions.CustomException;
import com.writeit.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User createUser(User user) {
		// userRepository.findUserByUsername(user.getUsername().toLowerCase()).orElseThrow(()
		// -> new CustomException("Username already taken : " +(user.getUsername()),
		// HttpStatus.OK));
		if (userRepository.findUserByUsername(user.getUsername().toLowerCase()).isPresent())
			throw new CustomException("Username already taken : " + (user.getUsername().toLowerCase()),
					HttpStatus.CONFLICT);
		user.setUsername(user.getUsername().toLowerCase());
		return userRepository.save(user);
	}

	@Override
	public User updateUserByUsername(User user, String username) {
		User founduser = userRepository.findUserByUsername(username.toLowerCase())
				.orElseThrow(() -> new CustomException("User Not Found with username : " + username.toLowerCase(),
						HttpStatus.NOT_FOUND));
		if (user.getUsername() != null)
			if (userRepository.findUserByUsername(user.getUsername().toLowerCase()).isPresent())
				throw new CustomException("Username already taken : " + (user.getUsername().toLowerCase()),
						HttpStatus.CONFLICT);
		founduser.setName(user.getName() == null ? founduser.getName() : user.getName());
		founduser.setPassword(user.getPassword() == null ? founduser.getPassword() : user.getPassword());
		System.out.println("PASSED USERNAME VALUE:" + user.getUsername() == null);
		founduser.setUsername(
				user.getUsername() == null ? founduser.getUsername().toLowerCase() : user.getUsername().toLowerCase());
		founduser.setAbout(user.getAbout() == null ? founduser.getAbout() : user.getAbout());
		User updateduser = userRepository.save(founduser);
		return updateduser;
	}

	@Override
	public User getUserByUsername(String username) {
		User foundUser = userRepository.findUserByUsername(username)
				.orElseThrow(() -> new CustomException("User Not Found with username : " + username.toLowerCase(),
						HttpStatus.NOT_FOUND));
		return foundUser;
	}

	@Override
	public boolean deleteUserByUsername(String username) {
		User foundUser = userRepository.findUserByUsername(username).orElseThrow(
				() -> new CustomException("User Not Found with username : " + username, HttpStatus.NOT_FOUND));
		userRepository.deleteById(foundUser.getUid());
		return true;
	}

	@Override
	public List<User> getAllUsers() {
		List<User> allusers = userRepository.findAll();
		if (allusers.size() == 0)
			throw new CustomException("No users found in DB !!", HttpStatus.NOT_FOUND);

		return allusers;
	}

}
