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
      for (const manufacturer of params.manufacturers) {
        if (manufacturer.toLocaleLowerCase() != vehicle.manufacturer.toLocaleLowerCase()) {
          return false;
        }
      }

      for (const type of params.type) {
        if (type.toLocaleLowerCase() != vehicle.type.toLocaleLowerCase()) {
          return false;
        }
      }

      for (const fuelType of params.fuelType) {
        if (fuelType.toLocaleLowerCase() != vehicle.fuelType.toLocaleLowerCase()) {
          return false;
        }
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
