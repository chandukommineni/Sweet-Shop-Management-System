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
    void testSearchSweets_ByNameOnly() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets("Rasg", null, null, null);

        assertEquals(1, results.size());
        assertEquals("Rasgulla", results.get(0).getName());
    }

    @Test
    void testSearchSweets_ByCategoryOnly() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets(null, SweetCategory.TRADITIONAL, null, null);

        assertEquals(1, results.size());
        assertEquals(SweetCategory.TRADITIONAL, results.get(0).getCategory());
    }

    @Test
    void testSearchSweets_ByPriceRangeOnly() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets(null, null, 50, 150);

        assertEquals(1, results.size());
        assertEquals(100, results.get(0).getPrice());
    }

    @Test
    void testSearchSweets_ByNameAndCategory() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets("Rasg", SweetCategory.TRADITIONAL, null, null);

        assertEquals(1, results.size());
        assertEquals("Rasgulla", results.get(0).getName());
        assertEquals(SweetCategory.TRADITIONAL, results.get(0).getCategory());
    }

    @Test
    void testSearchSweets_ByNameAndPriceRange() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets("Rasg", null, 50, 150);

        assertEquals(1, results.size());
        assertEquals("Rasgulla", results.get(0).getName());
    }

    @Test
    void testSearchSweets_ByCategoryAndPriceRange() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets(null, SweetCategory.TRADITIONAL, 50, 150);

        assertEquals(1, results.size());
        assertEquals(SweetCategory.TRADITIONAL, results.get(0).getCategory());
    }

    @Test
    void testSearchSweets_ByAllFilters() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets("Rasg", SweetCategory.TRADITIONAL, 50, 150);

        assertEquals(1, results.size());
        assertEquals("Rasgulla", results.get(0).getName());
        assertEquals(SweetCategory.TRADITIONAL, results.get(0).getCategory());
    }

    @Test
    void testSearchSweets_NoMatch() {
        when(sweetRepository.findAll()).thenReturn(List.of(sweet));

        List<SweetResponse> results = sweetService.searchSweets("NonExisting", null, null, null);

        assertTrue(results.isEmpty());
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

        assertEquals("Purchase successful", message);
    }

    @Test
    void testPurchaseSweet_OutOfStock() {
        sweet.setQuantity(0L);
        when(sweetRepository.findById("1")).thenReturn(Optional.of(sweet));

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> sweetService.purchaseSweet("1"));

        assertEquals("Sweet out of stock", exception.getMessage());
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
