import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IIngredient, Ingredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'jhi-ingredient-update',
  templateUrl: './ingredient-update.component.html'
})
export class IngredientUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    amount: [null, [Validators.required, Validators.min(0)]],
    unit: [null, [Validators.required]]
  });

  constructor(protected ingredientService: IngredientService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ingredient }) => {
      this.updateForm(ingredient);
    });
  }

  updateForm(ingredient: IIngredient): void {
    this.editForm.patchValue({
      id: ingredient.id,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ingredient = this.createFromForm();
    if (ingredient.id !== undefined) {
      this.subscribeToSaveResponse(this.ingredientService.update(ingredient));
    } else {
      this.subscribeToSaveResponse(this.ingredientService.create(ingredient));
    }
  }

  private createFromForm(): IIngredient {
    return {
      ...new Ingredient(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      unit: this.editForm.get(['unit'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngredient>>): void {
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
