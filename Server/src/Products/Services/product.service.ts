import { Model } from 'mongoose';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { CreateProductDto } from '../Dto/create-product.dto';
import { UpdateProductDto } from '../Dto/update-product.dto';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MODEL')
    private readonly productsModel: Model<Product>,
    private readonly cloudinaryService: CloudinaryService,
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

  // Create a new product with image upload
  async createProduct(
    createProductDto: CreateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    let imageUrl: string | null = null;
    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const newProduct = new this.productsModel({
      ...createProductDto,
      imageURL: imageUrl || '',
    });

    return newProduct.save();
  }

  // Update product with optional image upload
  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    let imageUrl = updateProductDto.imageURL;

    if (file) {
      imageUrl = await this.cloudinaryService.uploadImage(file);
    }

    const updatedProduct = await this.productsModel.findByIdAndUpdate(
      id,
      { ...updateProductDto, imageURL: imageUrl },
      { new: true },
    );

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
