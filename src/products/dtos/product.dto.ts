import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  @ApiProperty()
  readonly score: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly availability: boolean;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly categoryId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly cityId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly featureIds: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly policyIds: number[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
