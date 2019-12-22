import { IUser } from 'app/core/user/user.model';
import { IIngredient } from 'app/shared/model/ingredient.model';

export interface IRecipe {
  id?: number;
  name?: string;
  description?: string;
  user?: IUser;
  ingredients?: IIngredient[];
}

export class Recipe implements IRecipe {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public user?: IUser,
    public ingredients?: IIngredient[]
  ) {}
}
