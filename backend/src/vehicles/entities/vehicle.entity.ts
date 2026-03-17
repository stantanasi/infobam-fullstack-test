export interface IVehicle {
  id: string;
  manufacturer: string; // ex., "BMW", "Tesla", "Toyota"
  model: string; // ex., "X5", "Model 3", "Camry"
  year: number;
  type: VehicleType;
  price: number;
  fuelType: FuelType;
  transmission: string;
  mileage?: number;
  features: string[];
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Vehicle implements IVehicle {

  constructor(data: IVehicle) {
    Object.assign(this, data);
  }

  id: string;
  manufacturer: string; // ex., "BMW", "Tesla", "Toyota"
  model: string; // ex., "X5", "Model 3", "Camry"
  year: number;
  type: VehicleType;
  price: number;
  fuelType: FuelType;
  transmission: string;
  mileage?: number;
  features: string[];
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum VehicleType {
  SUV = "SUV",
  SEDAN = "SEDAN",
  TRUCK = "TRUCK",
  SPORTS = "SPORTS",
  LUXURY = "LUXURY",
  ELECTRIC = "ELECTRIC",
}

export enum FuelType {
  GASOLINE = "GASOLINE",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
  PLUGIN_HYBRID = "PLUGIN_HYBRID",
}
