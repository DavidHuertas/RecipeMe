package com.orchardsoft.recipeme.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.orchardsoft.recipeme.web.rest.TestUtil;

public class ConversionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Conversion.class);
        Conversion conversion1 = new Conversion();
        conversion1.setId(1L);
        Conversion conversion2 = new Conversion();
        conversion2.setId(conversion1.getId());
        assertThat(conversion1).isEqualTo(conversion2);
        conversion2.setId(2L);
        assertThat(conversion1).isNotEqualTo(conversion2);
        conversion1.setId(null);
        assertThat(conversion1).isNotEqualTo(conversion2);
    }
}
