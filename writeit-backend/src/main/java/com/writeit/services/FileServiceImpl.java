package com.writeit.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public boolean isImageWithValidExtension(MultipartFile file) {
		String filename = file.getOriginalFilename();
		if (filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
			return true;
		}
		return false;
	}
}
