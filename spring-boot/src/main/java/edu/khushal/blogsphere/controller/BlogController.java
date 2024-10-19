package edu.khushal.blogsphere.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.khushal.blogsphere.entity.Blog;
import edu.khushal.blogsphere.entity.Response;
import edu.khushal.blogsphere.service.BlogService;

@RestController
@CrossOrigin(origins = "*")
public class BlogController {

	@Autowired
	private BlogService blogService;
	
	@Autowired
	private UserController userController;
	
@PostMapping(value = "/blog")
	protected ResponseEntity<Response<Blog>> addBlog(@RequestParam(name = "title") String title, @RequestParam(name = "content") String content,
			@RequestParam(name = "author_name") String author, @RequestParam(name = "blogCategory") String blogCategory, @RequestParam(name = "userId") int userId) {
	    Blog blog2 = blogService.addBlog(title, content, author, blogCategory,userId);
	     userController.mapBlogToUser(userId,blog2.getId());
		Response<Blog> response=new Response<>();
		response.setHttpStatusCode(HttpStatus.OK.value());
		response.setData(blog2);
		return new ResponseEntity<Response<Blog>>(response,HttpStatus.OK);
				
	}
	
	
@GetMapping(value = "/blogs")
	protected ResponseEntity<Response<List<Blog>>> getBlogs() {
		List<Blog> allBlogs = blogService.getAllBlogs();
		Response<List<Blog>> response=new Response<>();
		response.setHttpStatusCode(HttpStatus.OK.value());
		response.setData(allBlogs);
		return new ResponseEntity<Response<List<Blog>>>(response, HttpStatus.OK);
	}
	
@PutMapping(value="/blog/{id}")
	public ResponseEntity<Blog> updateBlog(
	        @PathVariable int id,
	        @RequestBody Blog blog
	    ) {
	        Blog updatedBlog = blogService.updateBlog(id, blog);
	        
			return new ResponseEntity<Blog>(updatedBlog, HttpStatus.OK);
	        
	   }

@GetMapping(value = "/myblog/{id}")
protected ResponseEntity<Response<List<Blog>>> getMyBlogs(@PathVariable(name = "id") int userId) {
	List<Blog> myBlogs = blogService.getMyBlogs(userId);
	Response<List<Blog>> response=new Response<>();
	response.setHttpStatusCode(HttpStatus.OK.value());
	response.setData(myBlogs);
	return new ResponseEntity<Response<List<Blog>>>(response, HttpStatus.OK);
	
}

@DeleteMapping(value = "/blog/{userid}/{blogId}")
protected ResponseEntity<Response<Blog>> DeleteBlog(@PathVariable(name = "userid") int userId,@PathVariable(name = "blogId") int blogId) {
	blogService.deleteBlog(userId,blogId);
	Response<Blog> response=new Response<>();
	response.setHttpStatusCode(HttpStatus.OK.value());
	return new ResponseEntity<Response<Blog>>(response, HttpStatus.OK);
	
}

@GetMapping(value = "/blog/{blogId}")
protected ResponseEntity<Response<Blog>> getBlog(@PathVariable (name = "blogId") int blogId) {
	Blog blogById = blogService.findBlogById(blogId);
	Response<Blog> response=new Response<>();
	response.setHttpStatusCode(HttpStatus.OK.value());
	response.setData(blogById);
	return new ResponseEntity<Response<Blog>>(response, HttpStatus.OK);
	
}

}




