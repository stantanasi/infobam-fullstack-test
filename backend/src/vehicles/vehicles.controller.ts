import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FuelType, Vehicle, VehicleType } from './entities/vehicle.entity';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll(
    @Query() query: {
      manufacturer?: string;
      type?: string;
      fuel_type?: string;
      year?: string;

      limit?: number;
      offset?: number;
    }
  ) {
    const params = {
      manufacturers: query.manufacturer?.split(',') ?? [],
      type: query.type?.split(',') as VehicleType[] ?? [],
      fuelType: query.fuel_type?.split(',') as FuelType[] ?? [],
      year: query.year?.split('-').map((year) => +year) ?? [],

      limit: (+query.limit) || 10,
      offset: (+query.offset) || 0,
    };

    return this.vehiclesService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    const vehicle = this.vehiclesService.findOne(id);
    if (vehicle === undefined) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
