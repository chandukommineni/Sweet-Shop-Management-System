package com.sweetshop.management.system.sweet.service;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.model.Sweet;
import com.sweetshop.management.system.repository.SweetRepository;
import com.sweetshop.management.system.service.serviceImpl.SweetServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SweetServiceTest {

    @Mock
    private SweetRepository sweetRepository;

    @InjectMocks
    private SweetServiceImpl sweetService;

    private Sweet sweet;
    private SweetRequest sweetRequest;

    @BeforeEach
    void setUp() {
        sweet = Sweet.builder()
                .id("1")
                .name("Rasgulla")
                .category(SweetCategory.TRADITIONAL)
                .price(100)
                .quantity(10L)
                .build();

        sweetRequest = SweetRequest.builder()
                .name("Rasgulla")
                .price(100)
                .sweetCategory(SweetCategory.TRADITIONAL)
                .quantity(10L)
                .build();
    }

    // ---------- addSweet ----------
    @Test
    void testAddSweet_Success() {
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet);

        SweetResponse response = sweetService.addSweet(sweetRequest);

        assertNotNull(response);
        assertEquals("Rasgulla", response.getName());
        assertEquals(SweetCategory.TRADITIONAL, response.getCategory());
    }

    @Test
    void testAddSweet_InvalidPrice_ThrowsException() {
        sweetRequest.setPrice(0);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> sweetService.addSweet(sweetRequest));

        assertEquals("Price must be greater than 0", exception.getMessage());
    }

    // ---------- getAllSweets ----------
    @Test
    void testGetAllSweets_ReturnsList() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> sweets = sweetService.getAllSweets();

        assertEquals(1, sweets.size());
        assertEquals("Rasgulla", sweets.get(0).getName());
    }

    @Test
    void testGetAllSweets_EmptyList() {
        when(sweetRepository.findAll()).thenReturn(List.of());

        List<SweetResponse> sweets = sweetService.getAllSweets();

        assertTrue(sweets.isEmpty());
    }

    // ---------- searchSweets ----------
    @Test
    void testSearchSweets_ByCategory() {
        when(sweetRepository.findByCategory(SweetCategory.TRADITIONAL))
                .thenReturn(List.of(sweet));

        List<SweetResponse> sweets = sweetService.searchSweets(null, SweetCategory.TRADITIONAL, 0, 200);

        assertEquals(1, sweets.size());
        assertEquals("Rasgulla", sweets.get(0).getName());
    }

    @Test
    void testSearchSweets_ByPriceRange() {
        when(sweetRepository.findByPriceBetween(50, 150))
                .thenReturn(List.of(sweet));

        List<SweetResponse> sweets = sweetService.searchSweets(null, null, 50, 150);

        assertEquals(1, sweets.size());
    }

    @Test
    void testSearchSweets_NoResults() {
        when(sweetRepository.findByPriceBetween(200, 500))
                .thenReturn(List.of());

        List<SweetResponse> sweets = sweetService.searchSweets(null, null, 200, 500);

        assertTrue(sweets.isEmpty());
    }

    // ---------- updateSweet ----------
    @Test
    void testUpdateSweet_Success() {
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));
        when(sweetRepository.save(any(Sweet.class))).thenReturn(sweet);

        sweetRequest.setName("Updated Rasgulla");
        SweetResponse response = sweetService.updateSweet("1", sweetRequest);

        assertEquals("Updated Rasgulla", response.getName());
    }

    @Test
    void testUpdateSweet_NotFound() {
        when(sweetRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> sweetService.updateSweet("1", sweetRequest));
    }

    // ---------- deleteSweet ----------
    @Test
    void testDeleteSweet_Success() {
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));

        SweetResponse response = sweetService.deleteSweet("1");

        assertNotNull(response);
        assertEquals("Rasgulla", response.getName());
        verify(sweetRepository, times(1)).delete(sweet);
    }

    @Test
    void testDeleteSweet_NotFound() {
        when(sweetRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> sweetService.deleteSweet("1"));
    }

    // ---------- purchaseSweet ----------
    @Test
    void testPurchaseSweet_Success() {
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));
        sweet.setQuantity(5L);

        String message = sweetService.purchaseSweet("1");

        assertEquals("Purchased successfully", message);
    }

    @Test
    void testPurchaseSweet_OutOfStock() {
        sweet.setQuantity(0L);
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> sweetService.purchaseSweet("1"));

        assertEquals("Sweet is out of stock", exception.getMessage());
    }

    // ---------- restockSweet ----------
    @Test
    void testRestockSweet_Success() {
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));

        sweetService.restockSweet("1", 5L);

        verify(sweetRepository, times(1)).save(any(Sweet.class));
        assertEquals(15L, sweet.getQuantity());
    }

    @Test
    void testRestockSweet_NotFound() {
        when(sweetRepository.findById("1")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> sweetService.restockSweet("1", 5L));
    }
}
