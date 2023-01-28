package com.writeit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.writeit.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
