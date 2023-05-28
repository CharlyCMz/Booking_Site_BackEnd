import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyTypeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class UpdatePolicyTypeDTO extends PartialType(CreatePolicyTypeDTO) {}
