export interface IManufacturer {
  name: string;
}

export class Manufacturer implements IManufacturer {

  name: string;

  constructor(data: IManufacturer) {
    Object.assign(this, data);
  }

}
