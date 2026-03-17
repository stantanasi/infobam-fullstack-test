import { Injectable } from '@nestjs/common';
import { vehicles } from 'src/vehicles/data/vehicle.data';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturersService {
  create(createManufacturerDto: CreateManufacturerDto) {
    return 'This action adds a new manufacturer';
  }

  findAll() {
    return vehicles
      .map((vehicle) => vehicle.manufacturer)
      .map((manufacturer) => new Manufacturer({ name: manufacturer }));
  }

  findOne(id: string) {
    return vehicles
      .map((vehicle) => vehicle.manufacturer)
      .map((manufacturer) => new Manufacturer({ name: manufacturer }))
      .find((manufacturer) => manufacturer.name.toLocaleLowerCase() == id.toLocaleLowerCase());
  }

  update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: string) {
    return `This action removes a #${id} manufacturer`;
  }
}
