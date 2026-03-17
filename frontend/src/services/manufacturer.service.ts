import { Manufacturer } from '@/models/manufacturer.model';

const API_URL = 'http://localhost:3000';

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  return fetch(`${API_URL}/manufacturers`)
    .then((res) => res.json());
};