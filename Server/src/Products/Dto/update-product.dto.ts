import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Product name must be a string.' })
  productName?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number.' })
  price?: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string.' })
  imageURL?: string;
}
