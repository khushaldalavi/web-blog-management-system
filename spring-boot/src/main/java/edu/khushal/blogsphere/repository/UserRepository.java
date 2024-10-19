package edu.khushal.blogsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.khushal.blogsphere.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findUserByEmailAndPassword(String email, String password);

}
