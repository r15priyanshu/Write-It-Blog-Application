package com.writeit.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer cid;
	@NotEmpty(message = "Category name must not be empty or null")
	private String name;
	@NotEmpty(message = "Category description must not be empty or null")
	private String description;
	
	@OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
	List<Post> posts=new ArrayList<>();
}
