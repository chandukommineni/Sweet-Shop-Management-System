package com.sweetshop.management.system.sweet.model;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.model.Sweet;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class SweetModelTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidSweet() {
        Sweet sweet = Sweet.builder()
                .name("Gulab Jamun")
                .category(SweetCategory.TRADITIONAL)
                .price(150)
                .quantity(10L)
                .build();

        Set<ConstraintViolation<Sweet>> violations = validator.validate(sweet);
        assertEquals(0, violations.size());
    }

    @Test
    void testNameIsBlank() {
        Sweet sweet = Sweet.builder()
                .name("")
                .category(SweetCategory.TRADITIONAL)
                .price(200)
                .build();

        Set<ConstraintViolation<Sweet>> violations = validator.validate(sweet);
        assertFalse(violations.isEmpty());
        assertEquals("Sweet Name is Required", violations.iterator().next().getMessage());
    }

    @Test
    void testCategoryIsNull() {
        Sweet sweet = Sweet.builder()
                .name("Barfi")
                .category(null)
                .price(250)
                .build();

        Set<ConstraintViolation<Sweet>> violations = validator.validate(sweet);
        assertFalse(violations.isEmpty());
        assertEquals("Category is Required", violations.iterator().next().getMessage());
    }

    @Test
    void testPriceIsZero() {
        Sweet sweet = Sweet.builder()
                .name("Jalebi")
                .category(SweetCategory.TRADITIONAL)
                .price(0)
                .build();

        Set<ConstraintViolation<Sweet>> violations = validator.validate(sweet);
        assertFalse(violations.isEmpty());
        assertEquals("Price must be greater than 0", violations.iterator().next().getMessage());
    }
}
