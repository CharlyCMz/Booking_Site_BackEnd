import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly street: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly reference: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly suit: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly zipCode: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly locationId: number;
}

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}
