package com.writeit.controllers;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.engine.jdbc.StreamUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.writeit.dto.PostDto;
import com.writeit.dto.PostResponseDto;
import com.writeit.entities.Post;
import com.writeit.exceptions.ApiResponse;
import com.writeit.exceptions.CustomException;
import com.writeit.repositories.PostRepository;
import com.writeit.services.FileService;
import com.writeit.services.PostService;

@RestController
@RequestMapping("/api")
public class PostController {
	@Value("${writeit.images.posts}")
	String postimagepath;

	@Autowired
	PostService postService;

	@Autowired
	FileService fileService;
	
	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	ModelMapper modelMapper;

	// create new post [ USING JSON AS BODY ]
//	@PostMapping("/users/{username}/posts/{categoryname}")
//	public ResponseEntity<PostDto> createNewPost(@RequestBody Post post, @PathVariable("username") String username,
//			@PathVariable("categoryname") String categoryname) {
//		//System.out.println(categoryname);
//		Post createdpost = postService.createPost(post, username, categoryname);
//		return new ResponseEntity<PostDto>(modelMapper.map(createdpost, PostDto.class), HttpStatus.CREATED);
//	}
	
	 //create new post [ USING FORM DATA i.e, Inputs+File ]
	@PostMapping("/users/{username}/posts/{categoryname}")
	public ResponseEntity<PostDto> createNewPostWithFormData(@RequestParam("post") String post,@RequestParam(name = "image",required = false) MultipartFile file, @PathVariable("username") String username,
			@PathVariable("categoryname") String categoryname) {
		
		Post createdpost=null;
		try {
			Post postdata = objectMapper.readValue(post, Post.class);
			createdpost=postService.createPost(postdata, username, categoryname, file, postimagepath);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<PostDto>(modelMapper.map(createdpost, PostDto.class), HttpStatus.CREATED);
	}

	// Add Image to a post
	@PostMapping("/users/{username}/posts/{postid}/image")
	public ResponseEntity<ApiResponse> addImageToPost(@RequestParam("image") MultipartFile image,
			@PathVariable("username") String username, @PathVariable("postid") Integer postid) {
		String uploadedImageFilename = "";
		try {
			uploadedImageFilename = fileService.uploadImage(postimagepath, image);
		} catch (IOException e) {
			throw new CustomException("Error Occurred in Uploading Image", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		ApiResponse apiResponse = new ApiResponse("Image Successfully Uploaded with filename :" + uploadedImageFilename,
				LocalDateTime.now(), HttpStatus.OK, HttpStatus.OK.value());
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
	}

	// serve post Image
	@GetMapping(value = "/images/servepostimage/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void serveImage(@PathVariable("imagename") String imagename, HttpServletResponse response) {

		try {
			InputStream is = fileService.serveImage(postimagepath, imagename);
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(is, response.getOutputStream());

		} catch (FileNotFoundException e) {
			throw new CustomException("File Not Found with the name:" + imagename, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// get all posts of user by username
	@GetMapping("/users/{username}/posts")
	public ResponseEntity<List<PostDto>> getPostByUsername(@PathVariable("username") String username,
			@RequestParam(name = "mostrecentfirst", defaultValue = "true", required = false) Boolean mostrecentfirst) {
		List<PostDto> allPostsByUser = postService.getAllPostsByUser(username, mostrecentfirst).stream()
				.map(post -> modelMapper.map(post, PostDto.class)).collect(Collectors.toList());

		return new ResponseEntity<List<PostDto>>(allPostsByUser, HttpStatus.OK);
	}

	// get single post of user by pid
	@GetMapping("/users/{username}/posts/{postid}")
	public ResponseEntity<PostDto> getPostOfUserByPostId(@PathVariable("username") String username,
			@PathVariable("postid") Integer postid) {
		Post post = postService.getPostById(postid);
		return new ResponseEntity<PostDto>(modelMapper.map(post, PostDto.class), HttpStatus.OK);
	}

	// delete single post of user by pid
	@DeleteMapping("/users/{username}/posts/{postid}")
	public ResponseEntity<ApiResponse> deletePostOfUserByPostId(@PathVariable("username") String username,
			@PathVariable("postid") Integer postid) {
		postService.deletePostById(postid);
		ApiResponse apiResponse = new ApiResponse("Post Successfully Deleted with id :" + postid, LocalDateTime.now(),
				HttpStatus.OK, HttpStatus.OK.value());
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
	}

	// update single post of user by pid
	@PutMapping("/users/{username}/posts/{postid}")
	public ResponseEntity<PostDto> updatePostOfUserByPostId(@PathVariable("username") String username,
			@PathVariable("postid") Integer postid, @RequestBody Post newpostdata) {
		Post updatedpost = postService.updatePostById(newpostdata, postid, username);

		return new ResponseEntity<PostDto>(modelMapper.map(updatedpost, PostDto.class), HttpStatus.OK);
	}

	// get post by postid
	@GetMapping("/posts/{postid}")
	public ResponseEntity<PostDto> getPostByPostId(@PathVariable("postid") Integer postid) {
		Post post = postService.getPostById(postid);
		return new ResponseEntity<PostDto>(modelMapper.map(post, PostDto.class), HttpStatus.OK);
	}

	// http://localhost:8080/api/posts/category/CSE
	// get all post by category
	@GetMapping("/posts/category/{categoryname}")
	public ResponseEntity<PostResponseDto> getAllPostsByCategory(@PathVariable("categoryname") String categoryname,
			@RequestParam(value = "pagenumber", defaultValue = "0", required = false) Integer pagenumber,
			@RequestParam(value = "pagesize", defaultValue = "5", required = false) Integer pagesize,
			@RequestParam(value = "mostrecentfirst", defaultValue = "true", required = false) boolean mostrecentfirst) {
		PostResponseDto allPostsByCategory = postService.getAllPostsByCategory(categoryname, pagenumber, pagesize,
				mostrecentfirst);
		return new ResponseEntity<PostResponseDto>(allPostsByCategory, HttpStatus.OK);
	}

	// get all posts
	@GetMapping("/posts")
	public ResponseEntity<PostResponseDto> getAllPosts(
			@RequestParam(value = "pagenumber", defaultValue = "0", required = false) Integer pagenumber,
			@RequestParam(value = "pagesize", defaultValue = "5", required = false) Integer pagesize,
			@RequestParam(value = "mostrecentfirst", defaultValue = "true", required = false) boolean mostrecentfirst) {
		PostResponseDto allPosts = postService.getAllPosts(pagenumber, pagesize, mostrecentfirst);

		return new ResponseEntity<>(allPosts, HttpStatus.OK);
	}

}
