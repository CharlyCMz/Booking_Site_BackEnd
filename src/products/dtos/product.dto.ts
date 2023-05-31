import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';

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
  @IsPositive()
  @ApiProperty()
  readonly score: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly availability: boolean;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
