package edu.khushal.blogsphere.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.khushal.blogsphere.entity.Response;
import edu.khushal.blogsphere.entity.User;
import edu.khushal.blogsphere.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private UserService service;
	
	@PostMapping(value = "/user")
	protected ResponseEntity<User> addUser(@RequestBody User user) {
		 User user2 = service.addUser(user.getName(), user.getEmail(), user.getMobile(), user.getPassword(), user.getRole());
		  return new ResponseEntity<User>(user2, HttpStatus.OK);  
		
	}
	
	
	
	
	@GetMapping("/login/{email}/{password}")
    public ResponseEntity<Response<User>> loginUser(
            @PathVariable("email") String email,
            @PathVariable("password") String password) {
           User user = authenticateUser(email, password);
           Response<User> response=new Response<>();
        
        if (user != null) {
            response.setHttpStatusCode(HttpStatus.OK.value());
            response.setData(user);
        	
            return new ResponseEntity<Response<User>>(response, HttpStatus.OK);
        } else {
            response.setHttpStatusCode(HttpStatus.UNAUTHORIZED.value());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

   
    private User authenticateUser(String email, String password) {
        
       
            
            return service.findUserByEmailAndPassword(email, password);
         
    }
    
    @GetMapping(value = "/users")
    protected ResponseEntity<Response<List<User>>> findAllUsers() {
    	List<User> allUsers = service.findAllUsers();
    	Response<List<User>> response=new Response<>();
    	response.setHttpStatusCode(HttpStatus.OK.value());
    	response.setData(allUsers);
    	return new ResponseEntity<Response<List<User>>>(response, HttpStatus.OK);
		
	}
    
    @GetMapping(value = "/user/{id}")
    protected ResponseEntity<User> getUser(@PathVariable(name = "id") int id) {
    	User user = service.getUser(id);
    	return new ResponseEntity<User>(user, HttpStatus.OK);
    	
    	
		
	}
    
    @DeleteMapping(value = "/user/{id}")
    protected ResponseEntity<Response<User>>  deleteUser(@PathVariable(name = "id") int id) {
    	service.deleteUser(id);
    	Response<User> response=new Response<>();
    	response.setHttpStatusCode(HttpStatus.OK.value());
    	return new ResponseEntity<>( HttpStatus.OK);
    	
    	
    }
    
    @PutMapping(value = "/user")
    protected ResponseEntity<Response<User>> updateUser(@RequestBody User user) {
		User updateUser = service.updateUser(user);
		Response<User> response=new Response<>();
		response.setHttpStatusCode(HttpStatus.OK.value());
		response.setData(updateUser);
		return new ResponseEntity<Response<User>>(response, HttpStatus.OK);
	}
    
    
    @PatchMapping(value = "user/{id}/block")
    protected ResponseEntity<Response<User>> userBlock(@PathVariable(name = "id") int id) {
    	User userBlock = service.userBlock(id);
    	Response<User> response=new Response<>();
    	response.setHttpStatusCode(HttpStatus.OK.value());
    	response.setData(userBlock);
    	return new ResponseEntity<Response<User>>(response, HttpStatus.OK);
		
	}
    
    @PatchMapping(value = "user/{id}/unblock")
    protected ResponseEntity<Response<User>> userUnBlock(@PathVariable(name = "id") int id) {
    	User userUnBlock = service.userUnblock(id);
    	Response<User> response=new Response<>();
    	response.setHttpStatusCode(HttpStatus.OK.value());
    	response.setData(userUnBlock);
    	return new ResponseEntity<Response<User>>(response, HttpStatus.OK);
		
	}




	public void mapBlogToUser(int userId, int blogId) {
		service.mapBlogToUser(userId,blogId);
		
	}
    
    
    
    
	
	

}
