import { Unit } from 'app/shared/model/enumerations/unit.model';

export interface IIngredient {
  id?: number;
  name?: string;
  amount?: number;
  unit?: Unit;
}

export class Ingredient implements IIngredient {
  constructor(public id?: number, public name?: string, public amount?: number, public unit?: Unit) {}
}
