import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { DatabaseModule } from 'src/database/database.module';

import { Module } from '@nestjs/common';

import { ProductsController } from './Controllers/product.controller';
import { productsProviders } from './Providers/product.provider';
import { ProductsService } from './Services/product.service';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders],
})
export class ProductsModule {}
