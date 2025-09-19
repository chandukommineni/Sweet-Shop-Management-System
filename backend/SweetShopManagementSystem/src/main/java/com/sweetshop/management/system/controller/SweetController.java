package com.sweetshop.management.system.controller;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.service.SweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor
public class SweetController {

    private final SweetService sweetService;


    @PostMapping
    public ResponseEntity<SweetResponse> addSweet(@RequestBody SweetRequest request) {
        // TODO: Implement
        return ResponseEntity.ok(sweetService.addSweet(request));
    }


    @GetMapping
    public ResponseEntity<List<SweetResponse>> getAllSweets() {
        // TODO: Implement
        return ResponseEntity.ok(sweetService.getAllSweets());
    }


    @GetMapping("/search")
    public ResponseEntity<List<SweetResponse>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) SweetCategory category,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice
    ) {

        return ResponseEntity.ok(sweetService.searchSweets(name, category, minPrice, maxPrice));
    }


    @PutMapping("/{id}")
    public ResponseEntity<SweetResponse> updateSweet(
            @PathVariable String id,
            @RequestBody SweetRequest request
    ) {

        return ResponseEntity.ok(sweetService.updateSweet(id, request));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<SweetResponse> deleteSweet(@PathVariable String id) {
        // TODO: Implement
        return ResponseEntity.ok(sweetService.deleteSweet(id));
    }


    @PostMapping("/{id}/purchase")
    public ResponseEntity<String> purchaseSweet(@PathVariable String id) {
        // TODO: Implement
        return ResponseEntity.ok(sweetService.purchaseSweet(id));
    }


    @PostMapping("/{id}/restock")
    public ResponseEntity<Void> restockSweet(
            @PathVariable String id,
            @RequestParam Long quantity
    ) {
        sweetService.restockSweet(id, quantity);
        return ResponseEntity.ok().build();
    }
}
