package com.writeit.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.writeit.entities.Category;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

	Optional<Category> findCategoryByName(String categoryname);
}
