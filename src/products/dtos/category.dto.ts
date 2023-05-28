import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly imageId: number;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
