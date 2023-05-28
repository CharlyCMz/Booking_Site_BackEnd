import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly country: string;
}

export class UpdateCityDTO extends PartialType(CreateCityDTO) {}
