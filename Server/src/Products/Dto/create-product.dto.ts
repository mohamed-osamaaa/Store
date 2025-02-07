import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name cannot be empty.' })
  @IsString({ message: 'Product name must be a string.' })
  productName: string;

  @IsNotEmpty({ message: 'Price cannot be empty.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  price: number;

  @IsNotEmpty({ message: 'Image URL cannot be empty.' })
  @IsString({ message: 'Image URL must be a string.' })
  imageURL: string;
}
