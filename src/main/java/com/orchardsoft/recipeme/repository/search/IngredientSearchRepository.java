package com.orchardsoft.recipeme.repository.search;

import com.orchardsoft.recipeme.domain.Ingredient;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Ingredient} entity.
 */
public interface IngredientSearchRepository extends ElasticsearchRepository<Ingredient, Long> {
}
