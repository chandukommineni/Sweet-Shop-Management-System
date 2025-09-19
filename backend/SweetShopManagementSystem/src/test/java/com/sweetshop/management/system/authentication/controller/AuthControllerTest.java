package com.sweetshop.management.system.authentication.controller;

import com.sweetshop.management.system.constants.Role;
import com.sweetshop.management.system.controller.AuthController;
import com.sweetshop.management.system.dto.LoginRequest;
import com.sweetshop.management.system.dto.LoginResponse;
import com.sweetshop.management.system.dto.RegisterRequest;
import com.sweetshop.management.system.dto.RegisterResponse;
import com.sweetshop.management.system.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    private LoginRequest loginRequest;
    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        loginRequest = new LoginRequest();
        loginRequest.setUserName("test");
        loginRequest.setPassword("password123");

        registerRequest = new RegisterRequest();
        registerRequest.setUserName("test");
        registerRequest.setEmail("newuser@example.com");
        registerRequest.setPassword("securePass");
        registerRequest.setRole(Role.USER);
    }

    @Test
    void testLogin_Success() {
        LoginResponse mockResponse =
                new LoginResponse("test", "test@gmail.com", "jwt-token", Role.USER, 3600000L);

        when(authService.login(loginRequest)).thenReturn(mockResponse);

        ResponseEntity<LoginResponse> response = authController.login(loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("jwt-token", response.getBody().getToken());
    }

    @Test
    void testLogin_InvalidCredentials() {
        when(authService.login(loginRequest)).thenThrow(new RuntimeException("Invalid credentials"));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.login(loginRequest));

        assertEquals("Invalid credentials", exception.getMessage());
    }

    @Test
    void testLogin_NullRequest() {
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.login(null));

        assertNotNull(exception);
    }

    @Test
    void testLogin_ServiceReturnsNull() {
        when(authService.login(loginRequest)).thenReturn(null);

        ResponseEntity<LoginResponse> response = authController.login(loginRequest);

        assertNull(response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testRegister_Success() {
        RegisterResponse mockResponse =
                new RegisterResponse("test", "newuser@example.com", "User registered successfully");

        when(authService.register(registerRequest)).thenReturn(mockResponse);

        ResponseEntity<RegisterResponse> response = authController.register(registerRequest);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("User registered successfully", response.getBody().getMessage());
    }

    @Test
    void testRegister_DuplicateUser() {
        when(authService.register(registerRequest)).thenThrow(new RuntimeException("User already exists"));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.register(registerRequest));

        assertEquals("User already exists", exception.getMessage());
    }

    @Test
    void testRegister_InvalidEmail() {
        registerRequest.setEmail("invalid-email");

        when(authService.register(registerRequest)).thenThrow(new RuntimeException("Invalid email"));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.register(registerRequest));

        assertEquals("Invalid email", exception.getMessage());
    }

    @Test
    void testRegister_WeakPassword() {
        registerRequest.setPassword("123");

        when(authService.register(registerRequest)).thenThrow(new RuntimeException("Password too weak"));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.register(registerRequest));

        assertEquals("Password too weak", exception.getMessage());
    }

    @Test
    void testRegister_NullRequest() {
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> authController.register(null));

        assertNotNull(exception);
    }

    @Test
    void testRegister_ServiceReturnsNull() {
        when(authService.register(registerRequest)).thenReturn(null);

        ResponseEntity<RegisterResponse> response = authController.register(registerRequest);

        assertNull(response.getBody());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }
}
