package com.sweetshop.management.system.service;

import com.sweetshop.management.system.dto.LoginRequest;
import com.sweetshop.management.system.dto.LoginResponse;
import com.sweetshop.management.system.dto.RegisterRequest;
import com.sweetshop.management.system.dto.RegisterResponse;

public interface AuthService {
    public LoginResponse login(LoginRequest loginRequest);
    public RegisterResponse register(RegisterRequest registerRequest);
}
