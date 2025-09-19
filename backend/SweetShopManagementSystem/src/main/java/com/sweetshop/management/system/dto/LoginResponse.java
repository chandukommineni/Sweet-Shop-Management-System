package com.sweetshop.management.system.dto;

import com.sweetshop.management.system.constants.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String userName;
    private String email;
    private String token;
    private Role role;
    private Long expiration;
}
