import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipeMeTestModule } from '../../../test.module';
import { ConversionDetailComponent } from 'app/entities/conversion/conversion-detail.component';
import { Conversion } from 'app/shared/model/conversion.model';

describe('Component Tests', () => {
  describe('Conversion Management Detail Component', () => {
    let comp: ConversionDetailComponent;
    let fixture: ComponentFixture<ConversionDetailComponent>;
    const route = ({ data: of({ conversion: new Conversion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeMeTestModule],
        declarations: [ConversionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ConversionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConversionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load conversion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conversion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
