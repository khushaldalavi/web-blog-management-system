package edu.khushal.blogsphere.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.khushal.blogsphere.entity.Blog;
import edu.khushal.blogsphere.entity.BlogCategory;
import edu.khushal.blogsphere.entity.User;
import edu.khushal.blogsphere.repository.BlogRepository;
import edu.khushal.blogsphere.repository.UserRepository;

@Service
public class BlogService {

	@Autowired
	private BlogRepository blogRepository;
	
	@Autowired 
	private UserRepository userRepository;

	public Blog addBlog(String title, String content, String author, String blogCategory, int user_Id) {
		Blog webBlog = new Blog();
		webBlog.setTitle(title);
		webBlog.setContent(content);
		webBlog.setAuthor(author);
		webBlog.setDate(new Date(System.currentTimeMillis()));
		webBlog.setUserId(user_Id);

		if (blogCategory.equals("personal")) {
			webBlog.setBlogCategory(BlogCategory.Personal);

		} else if (blogCategory.equals("business")) {
			webBlog.setBlogCategory(BlogCategory.Business);
		} else if (blogCategory.equals("niche")) {
			webBlog.setBlogCategory(BlogCategory.Niche);
		} else if (blogCategory.equals("professional")) {
			webBlog.setBlogCategory(BlogCategory.Professional);
		} else if (blogCategory.equals("news")) {
			webBlog.setBlogCategory(BlogCategory.News);
		} else if (blogCategory.equals("travel")) {
			webBlog.setBlogCategory(BlogCategory.Travel);
		} else if (blogCategory.equals("fashion")) {
			webBlog.setBlogCategory(BlogCategory.FashionBeauty);
		} else if (blogCategory.equals("health")) {
			webBlog.setBlogCategory(BlogCategory.Health);
		} else if (blogCategory.equals("finance")) {
			webBlog.setBlogCategory(BlogCategory.Finance);
		} else if (blogCategory.equals("educational")) {
			webBlog.setBlogCategory(BlogCategory.Educational);
		} else {
			webBlog.setBlogCategory(BlogCategory.Political);
		}

		return blogRepository.save(webBlog);
	}

	public List<Blog> getAllBlogs() {
		List<Blog> blogs = blogRepository.findAll();
		return blogs;

	}

	public Blog updateBlog(int id, Blog blog) {
		Blog webBlog = blogRepository.findById(id).get();
		webBlog.setTitle(blog.getTitle());
		webBlog.setContent(blog.getContent());
		webBlog.setAuthor(blog.getAuthor());

		return blogRepository.save(webBlog);

	}

	public List<Blog> getMyBlogs(int userId) {
		User user = userRepository.findById(userId).get();
		List<Blog> webBlogs = user.getWebBlogs();
		return webBlogs;

	}

	public void deleteBlog(int userId, int blogId) {
		User user = userRepository.findById(userId).get();
		List<Blog> webBlogs = user.getWebBlogs();
		Blog deletedBlog=null;
		for (Blog blog : webBlogs) {
			if (blog.getId()==blogId) {
				deletedBlog=blog;
			}
		}
		webBlogs.remove(deletedBlog);
		user.setWebBlogs(webBlogs);
		userRepository.save(user);
		blogRepository.delete(deletedBlog);
		
	}

	public Blog findBlogById(int blogId) {
		Blog blog = blogRepository.findById(blogId).get();
		return blog;
	}

}
