package com.sweetshop.management.system.authentication.service;

import com.sweetshop.management.system.constants.Role;
import com.sweetshop.management.system.dto.LoginRequest;
import com.sweetshop.management.system.dto.LoginResponse;
import com.sweetshop.management.system.dto.RegisterRequest;
import com.sweetshop.management.system.dto.RegisterResponse;
import com.sweetshop.management.system.model.User;
import com.sweetshop.management.system.repository.UserRepository;
import com.sweetshop.management.system.service.serviceImpl.AuthServiceImpl;
import com.sweetshop.management.system.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ---------- REGISTER TESTS ------------

    @Test
    void register_ShouldSaveUser_WhenValidRequest() {
        RegisterRequest request = new RegisterRequest("john", "password", "john@example.com", Role.USER);
        User user = User.builder()
                .id("1")
                .userName("john")
                .email("john@example.com")
                .password("encodedPass")
                .role(Role.USER)
                .build();

        // Mocks
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByUserName("john")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password")).thenReturn("encodedPass");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Execute
        RegisterResponse response = authService.register(request);

        // Verify
        assertNotNull(response);
        assertEquals("john", response.getUserName());
        assertEquals("john@example.com", response.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("john", "password", "john@example.com", Role.USER);

        // Mocks
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.of(new User()));

        // Execute & Verify
        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email already exists", exception.getMessage());
    }

    @Test
    void register_ShouldThrowException_WhenUserNameAlreadyExists() {
        RegisterRequest request = new RegisterRequest("john", "password", "john@example.com", Role.USER);

        // Mocks
        when(userRepository.findByEmail("john@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByUserName("john")).thenReturn(Optional.of(new User()));

        // Execute & Verify
        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Username already exists", exception.getMessage());
    }

    // ---------- LOGIN TESTS ------------

    @Test
    void login_ShouldReturnToken_WhenValidCredentials() {
        LoginRequest request = new LoginRequest("john", "password");
        User user = User.builder()
                .id("1")
                .userName("john")
                .password("encodedPass")
                .email("john@example.com")
                .role(Role.USER)
                .build();

        // Mocks
        when(userRepository.findByUserName("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPass")).thenReturn(true);
        when(jwtUtil.generateToken("john", "USER")).thenReturn("jwtToken");
        when(jwtUtil.getExpirationTime()).thenReturn(3600000L);

        // Execute
        LoginResponse response = authService.login(request);

        // Verify
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals("john", response.getUserName());
        assertEquals("john@example.com", response.getEmail());
        assertEquals(Role.USER, response.getRole());
        assertEquals(3600000L, response.getExpiration());
    }

    @Test
    void login_ShouldThrowException_WhenUserNotFound() {
        LoginRequest request = new LoginRequest("unknown", "password");

        // Mocks
        when(userRepository.findByUserName("unknown")).thenReturn(Optional.empty());

        // Execute & Verify
        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid username or password", exception.getMessage());
    }

    @Test
    void login_ShouldThrowException_WhenPasswordIncorrect() {
        LoginRequest request = new LoginRequest("john", "wrongpassword");
        User user = User.builder()
                .userName("john")
                .password("encodedPass")
                .build();

        // Mocks
        when(userRepository.findByUserName("john")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongpassword", "encodedPass")).thenReturn(false);

        // Execute & Verify
        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid username or password", exception.getMessage());
    }
}
