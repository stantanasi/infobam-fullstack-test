import { Vehicle } from '@/models/vehicle.model';

const API_URL = 'http://localhost:3000';

export const getVehicles = async (): Promise<Vehicle[]> => {
  return fetch(`${API_URL}/vehicles`)
    .then((res) => res.json());
};

export const getVehicle = async (id: string): Promise<Vehicle | undefined> => {
  return fetch(`${API_URL}/vehicles/${id}`)
    .then((res) => res.json());
};