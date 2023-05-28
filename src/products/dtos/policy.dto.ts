import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePolicyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;
}

export class UpdatePolicyDTO extends PartialType(CreatePolicyDTO) {}
