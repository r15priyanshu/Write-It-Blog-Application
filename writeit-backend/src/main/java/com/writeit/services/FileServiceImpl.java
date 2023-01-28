package com.writeit.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.writeit.exceptions.CustomException;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String folderpath, MultipartFile file) throws IOException {
		//folderpath will be like : /images/posts OR /images/userprofiles that will be passed from outside
		String filename=file.getOriginalFilename();
		String filenamewithtimestamp="";
		if(filename.endsWith(".png") || filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
			Date d=new Date();
			filenamewithtimestamp=d.getTime()+"-"+filename;
			
		}else {
			throw new CustomException("File Format Not Supported",HttpStatus.BAD_REQUEST);
		}
		
		//creating fullpath along with image name
		String fullfilepath=folderpath+File.separator+filenamewithtimestamp;
		
		//create folder where images will be stored if already not created
		File f=new File(folderpath);
		if(!f.exists()) {
			//System.out.println(f.getAbsolutePath());
			f.mkdirs();
		}
			
		try {
			//Files.copy(file.getInputStream(),Paths.get(fullfilepath));
			byte[] data = file.getBytes();
			FileOutputStream fos=new FileOutputStream(fullfilepath);
			fos.write(data);
			fos.close();

		}catch (Exception e) {
			System.out.println("Some Error Occured");
		}
		return filenamewithtimestamp;
	}

	@Override
	public InputStream serveImage(String folderpath, String filename) throws FileNotFoundException {
		//folderpath will be like : /images/posts OR /images/userprofiles that will be passed from outside
		
		String fullfilepath=folderpath+File.separator+filename;
		InputStream is=new FileInputStream(fullfilepath);
		return is;
	}

}
