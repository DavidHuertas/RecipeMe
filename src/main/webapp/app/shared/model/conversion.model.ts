import { Unit } from 'app/shared/model/enumerations/unit.model';

export interface IConversion {
  id?: number;
  originUnit?: Unit;
  convertedUnit?: Unit;
  converter?: number;
}

export class Conversion implements IConversion {
  constructor(public id?: number, public originUnit?: Unit, public convertedUnit?: Unit, public converter?: number) {}
}
