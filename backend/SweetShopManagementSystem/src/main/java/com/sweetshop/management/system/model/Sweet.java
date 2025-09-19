package com.sweetshop.management.system.model;

import com.sweetshop.management.system.constants.SweetCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "sweets")
@Builder
@Data
public class Sweet {
    @Id
    private  String id;
    @NotBlank(message ="Sweet Name is Required")
    private String Name;
    @NotBlank(message = "Category is Required")
    private SweetCategory Category;
    @NotBlank(message="Price is Required")
    private Long price;
    private Long quantity=0l;
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;
}
