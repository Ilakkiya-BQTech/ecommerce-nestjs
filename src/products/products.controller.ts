import { Controller, Get, Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: { name: string; description: string; price: number; imageUrl: string }): Promise<Product> {
    return this.productsService.createProduct(body.name, body.description, body.price, body.imageUrl);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Product>): Promise<Product | null> {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}

