package com.orchardsoft.recipeme.repository.search;

import com.orchardsoft.recipeme.domain.Recipe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Recipe} entity.
 */
public interface RecipeSearchRepository extends ElasticsearchRepository<Recipe, Long> {
}
