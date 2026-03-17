import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';

@Module({
  imports: [VehiclesModule, ManufacturersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
