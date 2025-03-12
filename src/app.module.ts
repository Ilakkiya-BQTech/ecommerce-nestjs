import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity';
import { OrderItem } from './order/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'ecommerce.sqlite',
      entities: [User,Product,Order,OrderItem], 
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    OrderModule, 
  ],
})
export class AppModule {}

