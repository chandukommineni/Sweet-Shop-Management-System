package com.sweetshop.management.system.repository;

import com.sweetshop.management.system.constants.SweetCategory;
import com.sweetshop.management.system.model.Sweet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SweetRepository extends MongoRepository<Sweet, String> {

    Optional<Sweet> findByName(String name);

    List<Sweet> findByNameContainingIgnoreCase(String name);

    List<Sweet> findByCategory(SweetCategory category);

    List<Sweet> findByPriceGreaterThanEqualAndPriceLessThanEqual(int minPrice, int maxPrice);
}
