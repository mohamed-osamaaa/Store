import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { Transform } from '@nestjs/class-transformer';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name cannot be empty.' })
  @IsString({ message: 'Product name must be a string.' })
  productName: string;

  @IsNotEmpty({ message: 'Price cannot be empty.' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Price must be a number.' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string.' })
  imageURL: string;
}
