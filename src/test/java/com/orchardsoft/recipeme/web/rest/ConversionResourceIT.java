package com.orchardsoft.recipeme.web.rest;

import com.orchardsoft.recipeme.RecipeMeApp;
import com.orchardsoft.recipeme.domain.Conversion;
import com.orchardsoft.recipeme.repository.ConversionRepository;
import com.orchardsoft.recipeme.repository.search.ConversionSearchRepository;
import com.orchardsoft.recipeme.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static com.orchardsoft.recipeme.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.orchardsoft.recipeme.domain.enumeration.Unit;
import com.orchardsoft.recipeme.domain.enumeration.Unit;
/**
 * Integration tests for the {@link ConversionResource} REST controller.
 */
@SpringBootTest(classes = RecipeMeApp.class)
public class ConversionResourceIT {

    private static final Unit DEFAULT_ORIGIN_UNIT = Unit.G;
    private static final Unit UPDATED_ORIGIN_UNIT = Unit.KG;

    private static final Unit DEFAULT_CONVERTED_UNIT = Unit.G;
    private static final Unit UPDATED_CONVERTED_UNIT = Unit.KG;

    private static final BigDecimal DEFAULT_CONVERTER = new BigDecimal(0);
    private static final BigDecimal UPDATED_CONVERTER = new BigDecimal(1);

    @Autowired
    private ConversionRepository conversionRepository;

    /**
     * This repository is mocked in the com.orchardsoft.recipeme.repository.search test package.
     *
     * @see com.orchardsoft.recipeme.repository.search.ConversionSearchRepositoryMockConfiguration
     */
    @Autowired
    private ConversionSearchRepository mockConversionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restConversionMockMvc;

    private Conversion conversion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConversionResource conversionResource = new ConversionResource(conversionRepository, mockConversionSearchRepository);
        this.restConversionMockMvc = MockMvcBuilders.standaloneSetup(conversionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conversion createEntity(EntityManager em) {
        Conversion conversion = new Conversion()
            .originUnit(DEFAULT_ORIGIN_UNIT)
            .convertedUnit(DEFAULT_CONVERTED_UNIT)
            .converter(DEFAULT_CONVERTER);
        return conversion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Conversion createUpdatedEntity(EntityManager em) {
        Conversion conversion = new Conversion()
            .originUnit(UPDATED_ORIGIN_UNIT)
            .convertedUnit(UPDATED_CONVERTED_UNIT)
            .converter(UPDATED_CONVERTER);
        return conversion;
    }

    @BeforeEach
    public void initTest() {
        conversion = createEntity(em);
    }

    @Test
    @Transactional
    public void createConversion() throws Exception {
        int databaseSizeBeforeCreate = conversionRepository.findAll().size();

        // Create the Conversion
        restConversionMockMvc.perform(post("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conversion)))
            .andExpect(status().isCreated());

        // Validate the Conversion in the database
        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeCreate + 1);
        Conversion testConversion = conversionList.get(conversionList.size() - 1);
        assertThat(testConversion.getOriginUnit()).isEqualTo(DEFAULT_ORIGIN_UNIT);
        assertThat(testConversion.getConvertedUnit()).isEqualTo(DEFAULT_CONVERTED_UNIT);
        assertThat(testConversion.getConverter()).isEqualTo(DEFAULT_CONVERTER);

        // Validate the Conversion in Elasticsearch
        verify(mockConversionSearchRepository, times(1)).save(testConversion);
    }

    @Test
    @Transactional
    public void createConversionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = conversionRepository.findAll().size();

        // Create the Conversion with an existing ID
        conversion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConversionMockMvc.perform(post("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conversion)))
            .andExpect(status().isBadRequest());

        // Validate the Conversion in the database
        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Conversion in Elasticsearch
        verify(mockConversionSearchRepository, times(0)).save(conversion);
    }


    @Test
    @Transactional
    public void checkOriginUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = conversionRepository.findAll().size();
        // set the field null
        conversion.setOriginUnit(null);

        // Create the Conversion, which fails.

        restConversionMockMvc.perform(post("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conversion)))
            .andExpect(status().isBadRequest());

        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkConvertedUnitIsRequired() throws Exception {
        int databaseSizeBeforeTest = conversionRepository.findAll().size();
        // set the field null
        conversion.setConvertedUnit(null);

        // Create the Conversion, which fails.

        restConversionMockMvc.perform(post("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conversion)))
            .andExpect(status().isBadRequest());

        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConversions() throws Exception {
        // Initialize the database
        conversionRepository.saveAndFlush(conversion);

        // Get all the conversionList
        restConversionMockMvc.perform(get("/api/conversions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conversion.getId().intValue())))
            .andExpect(jsonPath("$.[*].originUnit").value(hasItem(DEFAULT_ORIGIN_UNIT.toString())))
            .andExpect(jsonPath("$.[*].convertedUnit").value(hasItem(DEFAULT_CONVERTED_UNIT.toString())))
            .andExpect(jsonPath("$.[*].converter").value(hasItem(DEFAULT_CONVERTER.intValue())));
    }
    
    @Test
    @Transactional
    public void getConversion() throws Exception {
        // Initialize the database
        conversionRepository.saveAndFlush(conversion);

        // Get the conversion
        restConversionMockMvc.perform(get("/api/conversions/{id}", conversion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(conversion.getId().intValue()))
            .andExpect(jsonPath("$.originUnit").value(DEFAULT_ORIGIN_UNIT.toString()))
            .andExpect(jsonPath("$.convertedUnit").value(DEFAULT_CONVERTED_UNIT.toString()))
            .andExpect(jsonPath("$.converter").value(DEFAULT_CONVERTER.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingConversion() throws Exception {
        // Get the conversion
        restConversionMockMvc.perform(get("/api/conversions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConversion() throws Exception {
        // Initialize the database
        conversionRepository.saveAndFlush(conversion);

        int databaseSizeBeforeUpdate = conversionRepository.findAll().size();

        // Update the conversion
        Conversion updatedConversion = conversionRepository.findById(conversion.getId()).get();
        // Disconnect from session so that the updates on updatedConversion are not directly saved in db
        em.detach(updatedConversion);
        updatedConversion
            .originUnit(UPDATED_ORIGIN_UNIT)
            .convertedUnit(UPDATED_CONVERTED_UNIT)
            .converter(UPDATED_CONVERTER);

        restConversionMockMvc.perform(put("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConversion)))
            .andExpect(status().isOk());

        // Validate the Conversion in the database
        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeUpdate);
        Conversion testConversion = conversionList.get(conversionList.size() - 1);
        assertThat(testConversion.getOriginUnit()).isEqualTo(UPDATED_ORIGIN_UNIT);
        assertThat(testConversion.getConvertedUnit()).isEqualTo(UPDATED_CONVERTED_UNIT);
        assertThat(testConversion.getConverter()).isEqualTo(UPDATED_CONVERTER);

        // Validate the Conversion in Elasticsearch
        verify(mockConversionSearchRepository, times(1)).save(testConversion);
    }

    @Test
    @Transactional
    public void updateNonExistingConversion() throws Exception {
        int databaseSizeBeforeUpdate = conversionRepository.findAll().size();

        // Create the Conversion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConversionMockMvc.perform(put("/api/conversions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(conversion)))
            .andExpect(status().isBadRequest());

        // Validate the Conversion in the database
        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Conversion in Elasticsearch
        verify(mockConversionSearchRepository, times(0)).save(conversion);
    }

    @Test
    @Transactional
    public void deleteConversion() throws Exception {
        // Initialize the database
        conversionRepository.saveAndFlush(conversion);

        int databaseSizeBeforeDelete = conversionRepository.findAll().size();

        // Delete the conversion
        restConversionMockMvc.perform(delete("/api/conversions/{id}", conversion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Conversion> conversionList = conversionRepository.findAll();
        assertThat(conversionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Conversion in Elasticsearch
        verify(mockConversionSearchRepository, times(1)).deleteById(conversion.getId());
    }

    @Test
    @Transactional
    public void searchConversion() throws Exception {
        // Initialize the database
        conversionRepository.saveAndFlush(conversion);
        when(mockConversionSearchRepository.search(queryStringQuery("id:" + conversion.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(conversion), PageRequest.of(0, 1), 1));
        // Search the conversion
        restConversionMockMvc.perform(get("/api/_search/conversions?query=id:" + conversion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(conversion.getId().intValue())))
            .andExpect(jsonPath("$.[*].originUnit").value(hasItem(DEFAULT_ORIGIN_UNIT.toString())))
            .andExpect(jsonPath("$.[*].convertedUnit").value(hasItem(DEFAULT_CONVERTED_UNIT.toString())))
            .andExpect(jsonPath("$.[*].converter").value(hasItem(DEFAULT_CONVERTER.intValue())));
    }
}
