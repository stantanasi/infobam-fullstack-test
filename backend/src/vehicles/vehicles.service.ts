import { Injectable } from '@nestjs/common';
import { vehicles } from './data/vehicle.data';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FuelType, Vehicle, VehicleType } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  create(createVehicleDto: CreateVehicleDto) {
    // TODO
    return 'This action adds a new vehicle';
  }

  findAll(params: {
    manufacturers: string[];
    type: VehicleType[];
    fuelType: FuelType[];
    year: number[];

    sort: string[],

    limit: number;
    offset: number;
  }): Vehicle[] {
    let result = vehicles;

    // Apply filters
    result = result.filter((vehicle) => {
      if (params.manufacturers.length > 0) {
        const brands = params.manufacturers.map(m => m.toLowerCase());
        if (!brands.includes(vehicle.manufacturer.toLowerCase())) return false;
      }

      if (params.type.length > 0) {
        const types = params.type.map(t => t.toLowerCase());
        if (!types.includes(vehicle.type.toLowerCase())) return false;
      }

      if (params.fuelType.length > 0) {
        const fuels = params.fuelType.map(f => f.toLowerCase());
        if (!fuels.includes(vehicle.fuelType.toLowerCase())) return false;
      }

      if (params.year.length === 1) {
        return vehicle.year == params.year[0];
      }
      if (params.year.length >= 2) {
        return params.year[0] <= vehicle.year && vehicle.year <= params.year[1];
      }

      return true;
    });

    // Apply sorting
    result.sort((a, b) => {
      for (const sort of params.sort) {
        const key = sort.charAt(0) === '-' ? sort.slice(1) : sort;
        const isDescending = sort.charAt(0) === '-';

        if (key != 'year' && key != 'price') {
          continue;
        }

        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) {
          return isDescending ? 1 : -1;
        }
        if (aValue > bValue) {
          return isDescending ? -1 : 1;
        }
      }
      return 0;
    });

    // Apply sorting
    result = result.slice(
      params.offset,
      params.offset + params.limit
    );

    return result;
  }

  findOne(id: string): Vehicle | undefined {
    return vehicles.find((vehicle) => vehicle.id == id);
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    // TODO
    return `This action updates a #${id} vehicle`;
  }

  remove(id: string) {
    // TODO
    return `This action removes a #${id} vehicle`;
  }
}
