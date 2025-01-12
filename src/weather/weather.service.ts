import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { Repository } from 'typeorm';

import { Weather } from './entities/weather.entity';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class WeatherService {
  private readonly API_URL = 'https://api.openweathermap.org/data/3.0/onecall';
  private readonly API_KEY: string;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    private readonly httpService: HttpService,
    private readonly loggerService: LoggerService,
  ) {
    this.API_KEY = process.env.OPENWEATHER_API_KEY;
  }

  async fetchAndSaveWeather(createWeatherDto: CreateWeatherDto): Promise<void> {
    const { lat, lon, exclude } = createWeatherDto;

    try {
      const response: AxiosResponse = await this.httpService.axiosRef.get(
        this.API_URL,
        {
          params: {
            lat,
            lon,
            exclude,
            appid: this.API_KEY,
          },
        },
      );
      this.loggerService.log(
        `Weather data fetched for lat: ${lat}, lon: ${lon}`,
      );

      if (response.data) {
        await this.saveWeatherData(lat, lon, exclude, response.data);
      }
    } catch (error) {
      this.loggerService.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getWeather(lat: number, lon: number, exclude: string): Promise<object> {
    this.loggerService.log(
      `Retrieving weather data for lat: ${lat}, lon: ${lon}`,
    );
    const weather = await this.weatherRepository.findOne({
      where: { lat, lon },
    });

    return weather?.data || {};
  }

  private async saveWeatherData(
    lat: number,
    lon: number,
    exclude: string,
    data: any,
  ) {
    const weatherData = new Weather();
    weatherData.lat = lat;
    weatherData.lon = lon;
    weatherData.exclude = exclude;
    weatherData.data = data;

    await this.weatherRepository.save(weatherData);
    this.loggerService.log(`Weather data saved for lat: ${lat}, lon: ${lon}`);
  }
}
