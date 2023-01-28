package com.writeit.services;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.writeit.entities.Comment;
import com.writeit.entities.Post;
import com.writeit.entities.User;
import com.writeit.exceptions.CustomException;
import com.writeit.repositories.CommentRepository;
import com.writeit.repositories.PostRepository;
import com.writeit.repositories.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CommentRepository commentRepository;
	
	@Override
	public Comment createComment(Comment comment, String username, Integer postid) {
		User founduser = userRepository.findUserByUsername(username).orElseThrow(() -> new CustomException("Username not found with name : " + username, HttpStatus.NOT_FOUND));
		Post foundpost=postRepository.findById(postid).orElseThrow(() -> new CustomException("Post not found with id : " + postid, HttpStatus.NOT_FOUND));
		comment.setCommentdate(new Date());
		comment.setUser(founduser);
		comment.setPost(foundpost);
		return commentRepository.save(comment);
	}

	@Override
	public void deleteComment(String username, Integer commentid) {
		User founduser = userRepository.findUserByUsername(username).orElseThrow(() -> new CustomException("Username not found with name : " + username, HttpStatus.NOT_FOUND));
		Comment foundcomment=commentRepository.findById(commentid).orElseThrow(() -> new CustomException("Comment not found with id : " + commentid, HttpStatus.NOT_FOUND));
		commentRepository.deleteById(commentid);
	}

}
