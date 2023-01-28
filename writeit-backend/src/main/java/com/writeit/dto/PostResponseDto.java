package com.writeit.dto;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {
	private List<PostDto> posts;
	private Integer currentpage;
	private Integer totalpage;
	private long totalposts;
	private boolean islastpage;
}
