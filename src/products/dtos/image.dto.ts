import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly url: string;
}

export class UpdateImageDTO extends PartialType(CreateImageDTO) {}
