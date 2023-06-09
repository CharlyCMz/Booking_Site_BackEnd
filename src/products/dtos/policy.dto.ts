import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePolicyDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly policyTypeId: number;
}

export class UpdatePolicyDTO extends PartialType(CreatePolicyDTO) {}
