package com.orchardsoft.recipeme.repository;

import com.orchardsoft.recipeme.domain.Conversion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Conversion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConversionRepository extends JpaRepository<Conversion, Long> {

}
