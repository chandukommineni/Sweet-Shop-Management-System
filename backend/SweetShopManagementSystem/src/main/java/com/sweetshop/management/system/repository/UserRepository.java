package com.sweetshop.management.system.repository;

import com.sweetshop.management.system.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByUserName(String username);

    Optional<User> findByEmail(String mail);
}
