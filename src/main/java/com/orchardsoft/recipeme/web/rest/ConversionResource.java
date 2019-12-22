package com.orchardsoft.recipeme.web.rest;

import com.orchardsoft.recipeme.domain.Conversion;
import com.orchardsoft.recipeme.repository.ConversionRepository;
import com.orchardsoft.recipeme.repository.search.ConversionSearchRepository;
import com.orchardsoft.recipeme.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.orchardsoft.recipeme.domain.Conversion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ConversionResource {

    private final Logger log = LoggerFactory.getLogger(ConversionResource.class);

    private static final String ENTITY_NAME = "conversion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConversionRepository conversionRepository;

    private final ConversionSearchRepository conversionSearchRepository;

    public ConversionResource(ConversionRepository conversionRepository, ConversionSearchRepository conversionSearchRepository) {
        this.conversionRepository = conversionRepository;
        this.conversionSearchRepository = conversionSearchRepository;
    }

    /**
     * {@code POST  /conversions} : Create a new conversion.
     *
     * @param conversion the conversion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new conversion, or with status {@code 400 (Bad Request)} if the conversion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/conversions")
    public ResponseEntity<Conversion> createConversion(@Valid @RequestBody Conversion conversion) throws URISyntaxException {
        log.debug("REST request to save Conversion : {}", conversion);
        if (conversion.getId() != null) {
            throw new BadRequestAlertException("A new conversion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Conversion result = conversionRepository.save(conversion);
        conversionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/conversions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /conversions} : Updates an existing conversion.
     *
     * @param conversion the conversion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated conversion,
     * or with status {@code 400 (Bad Request)} if the conversion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the conversion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/conversions")
    public ResponseEntity<Conversion> updateConversion(@Valid @RequestBody Conversion conversion) throws URISyntaxException {
        log.debug("REST request to update Conversion : {}", conversion);
        if (conversion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Conversion result = conversionRepository.save(conversion);
        conversionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, conversion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /conversions} : get all the conversions.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of conversions in body.
     */
    @GetMapping("/conversions")
    public ResponseEntity<List<Conversion>> getAllConversions(Pageable pageable) {
        log.debug("REST request to get a page of Conversions");
        Page<Conversion> page = conversionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /conversions/:id} : get the "id" conversion.
     *
     * @param id the id of the conversion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the conversion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/conversions/{id}")
    public ResponseEntity<Conversion> getConversion(@PathVariable Long id) {
        log.debug("REST request to get Conversion : {}", id);
        Optional<Conversion> conversion = conversionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(conversion);
    }

    /**
     * {@code DELETE  /conversions/:id} : delete the "id" conversion.
     *
     * @param id the id of the conversion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/conversions/{id}")
    public ResponseEntity<Void> deleteConversion(@PathVariable Long id) {
        log.debug("REST request to delete Conversion : {}", id);
        conversionRepository.deleteById(id);
        conversionSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/conversions?query=:query} : search for the conversion corresponding
     * to the query.
     *
     * @param query the query of the conversion search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/conversions")
    public ResponseEntity<List<Conversion>> searchConversions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Conversions for query {}", query);
        Page<Conversion> page = conversionSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
