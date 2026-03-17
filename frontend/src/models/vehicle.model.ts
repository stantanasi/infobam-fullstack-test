export interface Vehicle {
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

export const VehicleTypeLabels: Record<VehicleType, string> = {
  [VehicleType.SUV]: "SUV / Tout-terrain",
  [VehicleType.SEDAN]: "Berline",
  [VehicleType.TRUCK]: "Camion / Pick-up",
  [VehicleType.SPORTS]: "Sportive",
  [VehicleType.LUXURY]: "Luxe",
  [VehicleType.ELECTRIC]: "Électrique",
};

export enum FuelType {
  GASOLINE = "GASOLINE",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
  PLUGIN_HYBRID = "PLUGIN_HYBRID",
}

export const FuelTypeLabels: Record<FuelType, string> = {
  [FuelType.GASOLINE]: "Essence",
  [FuelType.DIESEL]: "Diesel",
  [FuelType.ELECTRIC]: "Électrique",
  [FuelType.HYBRID]: "Hybride",
  [FuelType.PLUGIN_HYBRID]: "Hybride rechargeable",
};
