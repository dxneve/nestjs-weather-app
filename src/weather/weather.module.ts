import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { Weather } from './entities/weather.entity';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [HttpModule, LoggerModule, TypeOrmModule.forFeature([Weather])],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
