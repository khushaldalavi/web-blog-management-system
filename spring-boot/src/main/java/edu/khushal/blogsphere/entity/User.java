package edu.khushal.blogsphere.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false, unique = false)
	private String name;
	@Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false, unique = true)
	private long mobile;
	@Column(nullable = false, unique = false)
	private String password;
	@Column(nullable = false, unique = false)
	private Role role;
	@Column(nullable = false, unique = false)
	private boolean block;
	@OneToMany(cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
	private List<Blog> webBlogs;

}
