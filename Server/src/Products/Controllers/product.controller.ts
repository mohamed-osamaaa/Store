import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  // Create a new product
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductDto);
  }

  // Update a product by ID
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  // Delete a product by ID
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return this.productsService.deleteProduct(id);
  }
}
