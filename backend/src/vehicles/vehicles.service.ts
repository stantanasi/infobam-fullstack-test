import { Injectable } from '@nestjs/common';
import { vehicles } from './data/vehicle.data';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  create(createVehicleDto: CreateVehicleDto) {
    return 'This action adds a new vehicle';
  }

  findAll(): Vehicle[] {
    return vehicles;
  }

  findOne(id: string): Vehicle | undefined {
    return vehicles.find((vehicle) => vehicle.id == id);
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: string) {
    return `This action removes a #${id} vehicle`;
  }
}
