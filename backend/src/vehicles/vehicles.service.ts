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
  }): Vehicle[] {
    const result = vehicles
      .filter((vehicle) => {
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
