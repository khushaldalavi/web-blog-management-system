package edu.khushal.blogsphere.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "blogs")
@Data
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false, unique = false)
	private BlogCategory  blogCategory;
	@Column(nullable = false, unique = false)
	private String title;
	@Lob
	@Column(nullable = false, unique = false,length = 5000)
	private String content;
	@Column(nullable = false, unique = false)
	private Date date;
	@Column(nullable = false, unique = false)
	private String author;
	@Column(nullable = false, unique = false)
	private int userId;
	
}
