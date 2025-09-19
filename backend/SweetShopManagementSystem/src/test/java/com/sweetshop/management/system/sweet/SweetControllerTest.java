package com.sweetshop.management.system.sweet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.controller.SweetController;
import com.sweetshop.management.system.dto.SweetRequest;
import com.sweetshop.management.system.dto.SweetResponse;
import com.sweetshop.management.system.service.SweetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class SweetControllerTest {

    @Mock
    private SweetService sweetService;

    @InjectMocks
    private SweetController sweetController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    private SweetRequest sweetRequest;
    private SweetResponse sweetResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(sweetController).build();
        objectMapper = new ObjectMapper();

        sweetRequest = SweetRequest.builder()
                .name("Rasgulla")
                .price(100)
                .sweetCategory(SweetCategory.TRADITIONAL)
                .quantity(10L)
                .build();

        sweetResponse = SweetResponse.builder()
                .name("Rasgulla")
                .category(SweetCategory.TRADITIONAL)
                .price(100)
                .quantiy(10L)
                .build();
    }


    @Test
    void testAddSweet_Success() throws Exception {
        when(sweetService.addSweet(any(SweetRequest.class))).thenReturn(sweetResponse);

        mockMvc.perform(post("/api/sweets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sweetRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Rasgulla"))
                .andExpect(jsonPath("$.category").value("TRADITIONAL"))
                .andExpect(jsonPath("$.price").value(100));
    }


    @Test
    void testGetAllSweets() throws Exception {
        when(sweetService.getAllSweets()).thenReturn(List.of(sweetResponse));

        mockMvc.perform(get("/api/sweets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Rasgulla"));
    }


    @Test
    void testSearchSweets() throws Exception {
        when(sweetService.searchSweets("Rasg", SweetCategory.TRADITIONAL, 50, 150))
                .thenReturn(List.of(sweetResponse));

        mockMvc.perform(get("/api/sweets/search")
                        .param("name", "Rasg")
                        .param("category", "TRADITIONAL")
                        .param("minPrice", "50")
                        .param("maxPrice", "150"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Rasgulla"));
    }


    @Test
    void testUpdateSweet() throws Exception {
        when(sweetService.updateSweet(eq("1"), any(SweetRequest.class))).thenReturn(sweetResponse);

        mockMvc.perform(put("/api/sweets/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sweetRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Rasgulla"));
    }


    @Test
    void testDeleteSweet() throws Exception {
        when(sweetService.deleteSweet("1")).thenReturn(sweetResponse);

        mockMvc.perform(delete("/api/sweets/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Rasgulla"));
    }


    @Test
    void testPurchaseSweet() throws Exception {
        when(sweetService.purchaseSweet("1")).thenReturn("Purchased successfully");

        mockMvc.perform(post("/api/sweets/1/purchase"))
                .andExpect(status().isOk())
                .andExpect(content().string("Purchased successfully"));
    }


    @Test
    void testRestockSweet() throws Exception {
        doNothing().when(sweetService).restockSweet("1", 5L);

        mockMvc.perform(post("/api/sweets/1/restock")
                        .param("quantity", "5"))
                .andExpect(status().isOk());
    }
}
