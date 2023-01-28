package com.writeit.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int uid;
	@NotEmpty(message = "Name cannot be Empty or Null")
	private String name;
	@NotEmpty(message = "Username cannot be Empty or Null")
	@Column(unique = true)
	private String username;
	@NotEmpty(message = "Password cannot be Empty or Null")
	@Size(min = 5,max = 20,message = "Password must be of length in between 5-20")
	private String password;
	private String about;
	private String profilepic="default.jpg";
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<Post> allposts=new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	@JoinTable(name = "user_role",joinColumns =@JoinColumn(name="uid",referencedColumnName = "uid"),inverseJoinColumns = @JoinColumn(name="rid",referencedColumnName = "rid"))
	private List<Role> roles;
	
}
