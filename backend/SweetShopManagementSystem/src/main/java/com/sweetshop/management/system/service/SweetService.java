package com.sweetshop.management.system.service;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;

import java.util.List;

public interface SweetService {
    public List<SweetResponse> getAllSweets();
    public SweetResponse addSweet(SweetRequest sweetRequest);
    public List<SweetResponse> searchSweets(String name, SweetCategory category,int minPrice,int maxPrice);
    public SweetResponse updateSweet(String id,SweetRequest sweetRequest);
    public SweetResponse deleteSweet(String id);
    public String purchaseSweet(String id);
    public void restockSweet(String id,Long quantity);
}
