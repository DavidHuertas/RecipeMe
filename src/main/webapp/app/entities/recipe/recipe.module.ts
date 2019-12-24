import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeMeSharedModule } from 'app/shared/shared.module';
import { RecipeComponent } from './recipe.component';
import { IngredientComponent } from 'app/entities/ingredient/ingredient.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update.component';
import { AddIngredientComponent} from './add-ingredient/add-ingredient.component';
import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';
import { recipeRoute } from './recipe.route';

@NgModule({
  imports: [RecipeMeSharedModule, RouterModule.forChild(recipeRoute)],
  declarations: [RecipeComponent, IngredientComponent, RecipeDetailComponent, RecipeUpdateComponent, AddIngredientComponent, RecipeDeleteDialogComponent],
  entryComponents: [RecipeDeleteDialogComponent]
})
export class RecipeMeRecipeModule {}
