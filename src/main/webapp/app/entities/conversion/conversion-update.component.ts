import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConversion, Conversion } from 'app/shared/model/conversion.model';
import { ConversionService } from './conversion.service';

@Component({
  selector: 'jhi-conversion-update',
  templateUrl: './conversion-update.component.html'
})
export class ConversionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    originUnit: [null, [Validators.required]],
    convertedUnit: [null, [Validators.required]],
    converter: [null, [Validators.min(0)]]
  });

  constructor(protected conversionService: ConversionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conversion }) => {
      this.updateForm(conversion);
    });
  }

  updateForm(conversion: IConversion): void {
    this.editForm.patchValue({
      id: conversion.id,
      originUnit: conversion.originUnit,
      convertedUnit: conversion.convertedUnit,
      converter: conversion.converter
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conversion = this.createFromForm();
    if (conversion.id !== undefined) {
      this.subscribeToSaveResponse(this.conversionService.update(conversion));
    } else {
      this.subscribeToSaveResponse(this.conversionService.create(conversion));
    }
  }

  private createFromForm(): IConversion {
    return {
      ...new Conversion(),
      id: this.editForm.get(['id'])!.value,
      originUnit: this.editForm.get(['originUnit'])!.value,
      convertedUnit: this.editForm.get(['convertedUnit'])!.value,
      converter: this.editForm.get(['converter'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConversion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
