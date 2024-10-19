package edu.khushal.blogsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.khushal.blogsphere.entity.Blog;
@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {

}
