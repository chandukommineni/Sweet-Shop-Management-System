package com.sweetshop.management.system.service.serviceImpl;

import com.sweetshop.management.system.constants.Role;
import com.sweetshop.management.system.dto.LoginRequest;
import com.sweetshop.management.system.dto.LoginResponse;
import com.sweetshop.management.system.dto.RegisterRequest;
import com.sweetshop.management.system.dto.RegisterResponse;
import com.sweetshop.management.system.exceptionhandler.exceptions.InvalidCredentialsException;
import com.sweetshop.management.system.exceptionhandler.exceptions.UserAlreadyExistsException;
import com.sweetshop.management.system.model.User;
import com.sweetshop.management.system.repository.UserRepository;
import com.sweetshop.management.system.service.AuthService;
import com.sweetshop.management.system.utils.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public RegisterResponse register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        if (userRepository.findByUserName(registerRequest.getUserName()).isPresent()) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        User user = User.builder()
                .userName(registerRequest.getUserName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(registerRequest.getRole() != null ? registerRequest.getRole() : Role.USER)
                .build();

        userRepository.save(user);

        return new RegisterResponse(
                user.getUserName(),
                user.getEmail(),
                "User registered successfully"


        );
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUserName(loginRequest.getUserName())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUserName(), user.getRole().name());
        return LoginResponse.builder()
                .userName(user.getUserName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .expiration(jwtUtil.getExpirationTime())
                .build();
    }
}
