import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipeMeSharedModule } from 'app/shared/shared.module';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update.component';
import { RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';
import { recipeRoute } from './recipe.route';

@NgModule({
  imports: [RecipeMeSharedModule, RouterModule.forChild(recipeRoute)],
  declarations: [RecipeComponent, RecipeDetailComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent],
  entryComponents: [RecipeDeleteDialogComponent]
})
export class RecipeMeRecipeModule {}
