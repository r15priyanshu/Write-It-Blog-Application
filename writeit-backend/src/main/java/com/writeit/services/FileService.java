package com.writeit.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	boolean isImageWithValidExtension(MultipartFile file);
}
