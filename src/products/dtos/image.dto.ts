import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateImageDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly url: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly productId: number;
}

export class UpdateImageDTO extends PartialType(CreateImageDTO) {}
