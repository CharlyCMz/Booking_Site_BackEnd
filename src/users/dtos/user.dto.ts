import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly personId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly rolId: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
