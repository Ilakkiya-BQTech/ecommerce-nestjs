import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Product } from 'src/products/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderItem,Product])],
  providers: [OrderService],
  controllers: [OrderController],
  exports:[OrderService]
})
export class OrderModule {}
