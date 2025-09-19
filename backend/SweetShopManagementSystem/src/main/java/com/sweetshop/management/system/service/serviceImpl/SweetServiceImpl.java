package com.sweetshop.management.system.service.serviceImpl;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.service.SweetService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SweetServiceImpl implements SweetService {
    @Override
    public List<SweetResponse> getAllSweets() {
        return List.of();
    }

    @Override
    public SweetResponse addSweet(SweetRequest sweetRequest) {
        return null;
    }

    @Override
    public List<SweetResponse> searchSweets(String name, SweetCategory category, int minPrice, int maxPrice) {
        return List.of();
    }

    @Override
    public SweetResponse updateSweet(String id, SweetRequest sweetRequest) {
        return null;
    }



    @Override
    public SweetResponse deleteSweet(String id) {
        return null;
    }

    @Override
    public String purchaseSweet(String id) {
        return "";
    }

    @Override
    public void restockSweet(String id, Long quantity) {

    }
}
