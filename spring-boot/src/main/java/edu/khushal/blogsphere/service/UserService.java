package edu.khushal.blogsphere.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.khushal.blogsphere.entity.Blog;
import edu.khushal.blogsphere.entity.Role;
import edu.khushal.blogsphere.entity.User;
import edu.khushal.blogsphere.repository.BlogRepository;
import edu.khushal.blogsphere.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private BlogRepository blogRepository;
	
	public User addUser(String userName, String email, long mobile, String password, Role role) {
		if (role.equals(Role.Admin)) {
			boolean flag = false;
			List<User> users = repository.findAll();
			for (User user : users) {
				if (user.getRole().equals(Role.Admin)) {
					flag = true;
					break;
				}
			}
			if (flag) {
				return null;
			}
		}
		User user = new User();
		user.setName(userName);
		user.setEmail(email);
		user.setMobile(mobile);
		user.setPassword(password);
		if (role.equals(Role.User)) {
			user.setRole(Role.User);
		} else {
			user.setRole(Role.Admin);
		}
		user.setBlock(false);
//		user.setWebBlogs(new ArrayList<WebBlogDTO>());
		try {
			return repository.save(user);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public User findUserByEmailAndPassword(String email, String password) {
		return repository.findUserByEmailAndPassword(email,password);
		
	}

	public List<User> findAllUsers() {
		List<User> users = repository.findAll();
		return users;
		
	}

	public void deleteUser(int id) {
		User user = repository.findById(id).get();
		repository.delete(user);;
		
	}

	public User updateUser(User user) {
		return repository.save(user);
		
	}

	public User userBlock(int id) {
		User user = repository.findById(id).get();
		user.setBlock(true);
		return repository.save(user);
		
	}
	
	public User userUnblock(int id) {
		User user = repository.findById(id).get();
		user.setBlock(false);
		return repository.save(user);
		
	}

	public User getUser(int id) {
		User user = repository.findById(id).get();
		return user;
		
	}

	public void mapBlogToUser(int userId, int blogId) {
		User user = repository.findById(userId).get();
		Blog blog = blogRepository.findById(blogId).get();
		List<Blog> webBlogs = user.getWebBlogs();
		webBlogs.add(blog);
		user.setWebBlogs(webBlogs);
		repository.save(user);
		
	}


}
