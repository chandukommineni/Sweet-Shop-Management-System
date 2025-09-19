package com.sweetshop.management.system.dto;

import com.sweetshop.management.system.constants.SweetCategory;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class SweetRequest {
    private String name;
    private int price;
    private SweetCategory sweetCategory;
    private Long quantity;
}
