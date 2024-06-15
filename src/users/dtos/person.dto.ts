import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePersonDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly personType: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly idTypeId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly document: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly comercialName: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly addressId: number;
}

export class UpdatePersonDTO extends PartialType(CreatePersonDTO) {}
