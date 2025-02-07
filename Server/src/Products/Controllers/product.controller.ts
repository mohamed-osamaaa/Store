import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from '../Dto/create-product.dto';
import { UpdateProductDto } from '../Dto/update-product.dto';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../Services/product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Get all products
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  // Get a single product by ID
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  // Create a new product with image upload
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto, file);
  }

  // Update a product with optional image upload
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto, file);
  }

  // Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return this.productsService.deleteProduct(id);
  }
}
