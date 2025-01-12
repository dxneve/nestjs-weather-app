import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDecimal } from 'class-validator';

export class CreateWeatherDto {
  @ApiProperty({ description: 'Latitude of the location', example: 33.44 })
  @IsDecimal()
  lat: number;

  @ApiProperty({ description: 'Longitude of the location', example: -94.04 })
  @IsDecimal()
  lon: number;

  @ApiPropertyOptional({
    description: 'Parts of the data to exclude',
    example: 'hourly,daily',
  })
  @IsOptional()
  @IsString()
  exclude: string;
}
