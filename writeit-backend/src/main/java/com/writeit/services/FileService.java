package com.writeit.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	String uploadImage(String folderpath, MultipartFile file) throws IOException;
	InputStream serveImage(String folderpath, String filename) throws FileNotFoundException;
}
