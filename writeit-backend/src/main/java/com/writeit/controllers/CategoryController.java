package com.writeit.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.writeit.dto.CategoryDto;
import com.writeit.entities.Category;
import com.writeit.exceptions.ApiResponse;
import com.writeit.services.CategoryService;

@RestController
@RequestMapping("/api")
public class CategoryController {

	@Autowired
	CategoryService categoryService;

	@Autowired
	ModelMapper modelMapper;

	// Create new category
	@PostMapping("/categories")
	public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody Category category) {
		Category createdcategory = categoryService.createCategory(category);
		return new ResponseEntity<>(modelMapper.map(createdcategory,CategoryDto.class), HttpStatus.CREATED);
	}

	// Get all categories
	@GetMapping("/categories")
	public ResponseEntity<List<CategoryDto>> getAllCategories() {
		List<CategoryDto> allCategories = categoryService.getAllCategories().stream().map(category->modelMapper.map(category,CategoryDto.class)).collect(Collectors.toList());
		return new ResponseEntity<>(allCategories, HttpStatus.OK);
	}

	// Get category by id
	@GetMapping("/categories/{cid}")
	public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("cid") Integer cid) {
		Category category = categoryService.getCategoryById(cid);
		return new ResponseEntity<>(modelMapper.map(category,CategoryDto.class), HttpStatus.OK);
	}

	// update category by id
	@PutMapping("/categories/{cid}")
	public ResponseEntity<CategoryDto> updateCategoryById(@PathVariable("cid") Integer cid,
			@Valid @RequestBody Category category) {
		Category updatedcategory = categoryService.updateCategory(category, cid);
		return new ResponseEntity<>(modelMapper.map(updatedcategory,CategoryDto.class), HttpStatus.OK);
	}

	// delete category by id
	@DeleteMapping("/categories/{cid}")
	public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable("cid") Integer cid) {
		categoryService.deleteCategory(cid);
		return new ResponseEntity<>(new ApiResponse("Category Successfully Deleted with id :" + cid,
				LocalDateTime.now(), HttpStatus.OK, HttpStatus.OK.value()), HttpStatus.OK);
	}
}
