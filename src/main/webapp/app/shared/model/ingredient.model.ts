import { IRecipe } from 'app/shared/model/recipe.model';
import { Unit } from 'app/shared/model/enumerations/unit.model';

export interface IIngredient {
  id?: number;
  name?: string;
  amount?: number;
  unit?: Unit;
  recipe?: IRecipe;
}

export class Ingredient implements IIngredient {
  constructor(public id?: number, public name?: string, public amount?: number, public unit?: Unit, public recipe?: IRecipe) {}
}
