package com.sweetshop.management.system.dto;


import com.sweetshop.management.system.constants.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "User Name is Required")
    private String userName;
    @NotBlank(message = "Password is Required ")
    private String password;
    @Email(message = "Invalid Email")
    private String email;
    private Role role=Role.USER;
}
