import { Component, NgModule } from '@angular/core';

import { IngredientComponent } from 'app/entities/ingredient/ingredient.component';

@NgModule({
  declarations: [IngredientComponent]
})

@Component({
  selector: 'jhi-add-ingredient',
  templateUrl: './add-ingredient.component.html'
})
export class AddIngredientComponent {}
