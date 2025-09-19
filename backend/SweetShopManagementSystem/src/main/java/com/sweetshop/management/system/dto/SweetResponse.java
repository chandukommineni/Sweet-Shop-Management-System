package com.sweetshop.management.system.dto;

import com.sweetshop.management.system.constants.SweetCategory;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SweetResponse {
  private String name;
  private SweetCategory category;
  private int price;
  private long quantiy;
}
