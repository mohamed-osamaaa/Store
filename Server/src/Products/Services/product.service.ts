import { Model } from 'mongoose';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from '../Dto/create-product.dto';
import { UpdateProductDto } from '../Dto/update-product.dto';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MODEL')
    private readonly productsModel: Model<Product>,
  ) {}

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    return this.productsModel.find().exec();
  }

  // Get a single product by ID
  async getProductById(id: string): Promise<Product> {
    const product = await this.productsModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  // Create a new product
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productsModel(createProductDto);
    return newProduct.save();
  }

  // Update an existing product by ID
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productsModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true, // Returns the updated document
      })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return updatedProduct;
  }

  // Delete a product by ID
  async deleteProduct(id: string): Promise<{ message: string }> {
    const deletedProduct = await this.productsModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return { message: `Product with ID ${id} deleted successfully.` };
  }
}
