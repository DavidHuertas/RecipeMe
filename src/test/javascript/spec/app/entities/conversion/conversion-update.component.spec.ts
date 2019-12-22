import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipeMeTestModule } from '../../../test.module';
import { ConversionUpdateComponent } from 'app/entities/conversion/conversion-update.component';
import { ConversionService } from 'app/entities/conversion/conversion.service';
import { Conversion } from 'app/shared/model/conversion.model';

describe('Component Tests', () => {
  describe('Conversion Management Update Component', () => {
    let comp: ConversionUpdateComponent;
    let fixture: ComponentFixture<ConversionUpdateComponent>;
    let service: ConversionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipeMeTestModule],
        declarations: [ConversionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConversionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConversionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConversionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conversion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conversion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
