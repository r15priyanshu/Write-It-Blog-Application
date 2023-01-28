package com.writeit.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.writeit.entities.Category;
import com.writeit.exceptions.CustomException;
import com.writeit.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	@Override
	public Category createCategory(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category, Integer id) {
		Category foundcategory = categoryRepository.findById(id).orElseThrow(()->new CustomException("Category not found with id :"+id,HttpStatus.NOT_FOUND));
		foundcategory.setName(category.getName());
		foundcategory.setDescription(category.getDescription());
		return categoryRepository.save(foundcategory);
	}

	@Override
	public void deleteCategory(Integer id) {
		categoryRepository.findById(id).orElseThrow(()->new CustomException("Category not found with id :"+id,HttpStatus.NOT_FOUND));
		categoryRepository.deleteById(id);
	}

	@Override
	public Category getCategoryById(Integer id) {
		Category foundcategory = categoryRepository.findById(id).orElseThrow(()->new CustomException("Category not found with id :"+id,HttpStatus.NOT_FOUND));
		return foundcategory;
	}

	@Override
	public List<Category> getAllCategories() {
		List<Category> allcategories = categoryRepository.findAll();
		if(allcategories.size()==0)
			throw new CustomException("No Category found",HttpStatus.NOT_FOUND);
		return allcategories;
	}
	
}
