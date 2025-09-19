package com.sweetshop.management.system.authentication.model;


import com.sweetshop.management.system.constants.Role;
import com.sweetshop.management.system.model.User;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UserModelTest {
    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    public void checkDefaultValueOfRole(){
        User user =new User();
        assertEquals(Role.USER,user.getRole());
        assertEquals(false,Role.ADMIN==user.getRole());
        user.setRole(Role.ADMIN);
        assertEquals(Role.ADMIN,user.getRole());


    }
    @Test
    void testValidEmail() {
        User user = User.builder()
                .userName("testuser")
                .password("password123")
                .email("valid@example.com")
                .build();

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertTrue(violations.isEmpty(), "Expected no violations for a valid email.");
    }

    @Test
    void testInvalidEmailFormat() {
        User user = User.builder()
                .userName("testuser")
                .password("password123")
                .email("invalid-email")
                .build();

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertFalse(violations.isEmpty(), "Expected violations for an invalid email format.");
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Email should be valid", violation.getMessage());
        assertEquals("email", violation.getPropertyPath().toString());
    }

    @Test
    void testBlankEmail() {
        User user = User.builder()
                .userName("testuser")
                .password("password123")
                .email("") // Blank email
                .build();

        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertFalse(violations.isEmpty(), "Expected violations for a blank email.");
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Email is required", violation.getMessage());
        assertEquals("email", violation.getPropertyPath().toString());
    }
    @Test
    public void testBlankUsername() {

        User user = User.builder()
                .userName("") // Blank username
                .email("test.user@example.com")
                .password("password123")
                .build();


        Set<ConstraintViolation<User>> violations = validator.validate(user);


        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Username is Required", violation.getMessage());
        assertEquals("userName", violation.getPropertyPath().toString());
    }
    @Test
    public void testBlankPassword(){
        User user = User.builder()
                .userName("Chandu") // Blank username
                .email("test.user@example.com")
                .password("")
                .build();


        Set<ConstraintViolation<User>> violations = validator.validate(user);


        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Password is Required", violation.getMessage());
        assertEquals("password", violation.getPropertyPath().toString());
    }
}
