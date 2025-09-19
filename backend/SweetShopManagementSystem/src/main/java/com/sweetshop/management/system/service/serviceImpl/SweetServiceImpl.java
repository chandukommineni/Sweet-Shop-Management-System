package com.sweetshop.management.system.service.serviceImpl;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.exceptionhandler.exceptions.SweetNotFoundException;
import com.sweetshop.management.system.model.Sweet;
import com.sweetshop.management.system.repository.SweetRepository;
import com.sweetshop.management.system.service.SweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SweetServiceImpl implements SweetService {

    private final SweetRepository sweetRepository;


    private SweetResponse mapToResponse(Sweet sweet) {
        return SweetResponse.builder()
                .name(sweet.getName())
                .category(sweet.getCategory())
                .price(sweet.getPrice())
                .quantiy(sweet.getQuantity())
                .build();
    }

    private Sweet mapToEntity(SweetRequest request) {
        return Sweet.builder()
                .name(request.getName())
                .category(request.getSweetCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity() != null ? request.getQuantity() : 0L)
                .build();
    }


    @Override
    public List<SweetResponse> getAllSweets() {
        return sweetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public SweetResponse addSweet(SweetRequest sweetRequest) {
        Sweet sweet = mapToEntity(sweetRequest);
        Sweet saved = sweetRepository.save(sweet);
        return mapToResponse(saved);
    }

    @Override
    public List<SweetResponse> searchSweets(String name, SweetCategory category, Integer minPrice, Integer maxPrice) {
        List<Sweet> allSweets = sweetRepository.findAll();

        return allSweets.stream()
                .filter(sweet -> (name == null || name.isBlank() || sweet.getName().toLowerCase().contains(name.toLowerCase())))
                .filter(sweet -> (category == null || sweet.getCategory() == category))
                .filter(sweet -> (minPrice == null || maxPrice == null
                        || (sweet.getPrice() >= minPrice && sweet.getPrice() <= maxPrice)))
                .map(this::mapToResponse)
                .toList();
    }


    @Override
    public SweetResponse updateSweet(String id, SweetRequest sweetRequest) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        sweet.setName(sweetRequest.getName());
        sweet.setCategory(sweetRequest.getSweetCategory());
        sweet.setPrice(sweetRequest.getPrice());
        sweet.setQuantity(sweetRequest.getQuantity());

        Sweet updated = sweetRepository.save(sweet);
        return mapToResponse(updated);
    }

    @Override
    public SweetResponse deleteSweet(String id) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        sweetRepository.delete(sweet);
        return mapToResponse(sweet);
    }

    @Override
    public String purchaseSweet(String id) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));

        if (sweet.getQuantity() <= 0) {
            throw new RuntimeException("Sweet out of stock");
        }

        sweet.setQuantity(sweet.getQuantity() - 1);
        sweetRepository.save(sweet);

        return "Purchase successful";
    }

    @Override
    public void restockSweet(String id, Long quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new SweetNotFoundException("Sweet not found"));

        sweet.setQuantity(sweet.getQuantity() + quantity);
        sweetRepository.save(sweet);
    }

    @Override
    public SweetResponse getSweetById(String id) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new SweetNotFoundException("Sweet Not Found"));

        return mapToResponse(sweet);
    }

}
