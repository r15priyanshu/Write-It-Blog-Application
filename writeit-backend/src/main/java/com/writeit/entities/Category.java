package com.writeit.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotEmpty;
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
