import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly eMail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsBoolean()
  @ApiProperty()
  readonly accountValidation: boolean;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly rolId: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
