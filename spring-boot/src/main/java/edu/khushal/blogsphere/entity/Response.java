package edu.khushal.blogsphere.entity;

import lombok.Data;

@Data
public class Response<T> {

	private int httpStatusCode;
	private T data;
	
	
}
