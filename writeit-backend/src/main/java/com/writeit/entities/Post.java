package com.writeit.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int pid;
	private String title;
	@Lob
	private String content;
	private String image="defaultpostimage.jpg";
	private Date date;
	
	@ManyToOne
	@JoinColumn(name = "cid")
	private Category category;
	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;
	
	@OneToMany(mappedBy ="post",cascade = CascadeType.ALL)
	private List<Comment> comments;
}
