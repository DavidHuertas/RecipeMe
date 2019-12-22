package com.orchardsoft.recipeme.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.math.BigDecimal;

import com.orchardsoft.recipeme.domain.enumeration.Unit;

/**
 * A Conversion.
 */
@Entity
@Table(name = "conversion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "conversion")
public class Conversion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "origin_unit", nullable = false)
    private Unit originUnit;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "converted_unit", nullable = false)
    private Unit convertedUnit;

    @DecimalMin(value = "0")
    @Column(name = "converter", precision = 21, scale = 2)
    private BigDecimal converter;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Unit getOriginUnit() {
        return originUnit;
    }

    public Conversion originUnit(Unit originUnit) {
        this.originUnit = originUnit;
        return this;
    }

    public void setOriginUnit(Unit originUnit) {
        this.originUnit = originUnit;
    }

    public Unit getConvertedUnit() {
        return convertedUnit;
    }

    public Conversion convertedUnit(Unit convertedUnit) {
        this.convertedUnit = convertedUnit;
        return this;
    }

    public void setConvertedUnit(Unit convertedUnit) {
        this.convertedUnit = convertedUnit;
    }

    public BigDecimal getConverter() {
        return converter;
    }

    public Conversion converter(BigDecimal converter) {
        this.converter = converter;
        return this;
    }

    public void setConverter(BigDecimal converter) {
        this.converter = converter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conversion)) {
            return false;
        }
        return id != null && id.equals(((Conversion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Conversion{" +
            "id=" + getId() +
            ", originUnit='" + getOriginUnit() + "'" +
            ", convertedUnit='" + getConvertedUnit() + "'" +
            ", converter=" + getConverter() +
            "}";
    }
}
