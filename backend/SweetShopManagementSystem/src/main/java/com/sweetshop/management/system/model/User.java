package com.sweetshop.management.system.model;

import com.sweetshop.management.system.constants.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id ;
    @NotBlank(message ="Username is Required")
    private String userName;
    @NotBlank(message = "Password is Required")
    private String password;


    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    private Role role=Role.USER;

    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;

}
