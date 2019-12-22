package com.orchardsoft.recipeme.repository.search;

import com.orchardsoft.recipeme.domain.Conversion;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Conversion} entity.
 */
public interface ConversionSearchRepository extends ElasticsearchRepository<Conversion, Long> {
}
