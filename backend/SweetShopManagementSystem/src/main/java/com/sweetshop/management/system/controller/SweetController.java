package com.sweetshop.management.system.controller;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.service.SweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor
public class SweetController {

    private final SweetService sweetService;



    @PostMapping
    public ResponseEntity<SweetResponse> addSweet(@RequestBody SweetRequest request) {
        SweetResponse response = sweetService.addSweet(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<SweetResponse>> getAllSweets() {
        List<SweetResponse> sweets = sweetService.getAllSweets();
        return ResponseEntity.ok(sweets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SweetResponse> getSweetById(@PathVariable  String id){
        return new ResponseEntity<>(sweetService.getSweetById(id), HttpStatus.FOUND);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SweetResponse>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) SweetCategory category,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice
    ) {
        List<SweetResponse> results = sweetService.searchSweets(name, category, minPrice, maxPrice);
        return ResponseEntity.ok(results);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SweetResponse> updateSweet(
            @PathVariable String id,
            @RequestBody SweetRequest request
    ) {
        SweetResponse updated = sweetService.updateSweet(id, request);
        return ResponseEntity.ok(updated);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SweetResponse> deleteSweet(@PathVariable String id) {
        SweetResponse deleted = sweetService.deleteSweet(id);
        return ResponseEntity.ok(deleted);
    }




    @PostMapping("/{id}/purchase")
    public ResponseEntity<String> purchaseSweet(@PathVariable String id) {
        String message = sweetService.purchaseSweet(id);
        return ResponseEntity.ok(message);
    }


    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> restockSweet(
            @PathVariable String id,
            @RequestParam Long quantity
    ) {
        sweetService.restockSweet(id, quantity);
        return ResponseEntity.ok().build();
    }
}
