import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { FormatResponseInterceptor } from './format-response.interceptor';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @ApiOperation({ summary: 'Fetch and save weather data' })
  @ApiResponse({ status: 201, description: 'Weather data has been saved.' })
  fetchAndSaveWeather(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.fetchAndSaveWeather(createWeatherDto);
  }

  @Get()
  @UseInterceptors(FormatResponseInterceptor)
  @ApiOperation({ summary: 'Get weather data' })
  @ApiQuery({ name: 'exclude', required: false })
  @ApiResponse({
    status: 200,
    description: 'Weather data retrieved successfully.',
  })
  getWeather(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('exclude') exclude: string,
  ) {
    return this.weatherService.getWeather(lat, lon, exclude);
  }
}
