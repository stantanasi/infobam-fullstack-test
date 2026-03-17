import { FuelType, Vehicle, VehicleType } from '@/models/vehicle.model';

const API_URL = 'http://localhost:3000';

export const getVehicles = async (params?: {
  manufacturers?: string[];
  type?: VehicleType[];
  fuel_type?: FuelType[];
  year?: number[];

  sort?: string[];

  limit?: number;
  offset?: number;
}): Promise<Vehicle[]> => {
  const url = new URL(`${API_URL}/vehicles`);

  for (const [key, val] of Object.entries(params ?? {})) {
    if (Array.isArray(val) ? val.length === 0 : !val) continue;

    url.searchParams.append(key, Array.isArray(val) ? val.join(',') : val.toString());
  }

  return fetch(url.toString())
    .then((res) => res.json());
};

export const getVehicle = async (id: string): Promise<Vehicle | undefined> => {
  return fetch(`${API_URL}/vehicles/${id}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return undefined;
    });
};