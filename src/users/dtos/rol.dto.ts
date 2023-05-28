import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly rolName: string;
}

export class UpdateRolDTO extends PartialType(CreateRolDTO) {}
