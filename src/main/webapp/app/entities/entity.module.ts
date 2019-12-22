import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'recipe',
        loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeMeRecipeModule)
      },
      {
        path: 'ingredient',
        loadChildren: () => import('./ingredient/ingredient.module').then(m => m.RecipeMeIngredientModule)
      },
      {
        path: 'conversion',
        loadChildren: () => import('./conversion/conversion.module').then(m => m.RecipeMeConversionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class RecipeMeEntityModule {}
