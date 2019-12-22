import { IUser } from 'app/core/user/user.model';

export interface IRecipe {
  id?: number;
  name?: string;
  description?: string;
  user?: IUser;
}

export class Recipe implements IRecipe {
  constructor(public id?: number, public name?: string, public description?: string, public user?: IUser) {}
}
