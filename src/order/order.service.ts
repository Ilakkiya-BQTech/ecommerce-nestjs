import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepo:Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRepo:Repository<OrderItem>,
        @InjectRepository(Product) private productRepo: Repository<Product>
    ){}
    async createOrder(userId:number,items:{productId:number;quantity:number}[]):Promise<Order>{
        const order= new Order();
        order.user={id:userId} as User;
        order.status='pending';
        order.items=[];
        for (const item of items){
            const product=await this.productRepo.findOne({where:{id:item.productId}});
            if(!product) throw new Error('Product not found')
                const orderItem=new OrderItem();
            orderItem.product=product;
            orderItem.quantity = item.quantity;
            orderItem.price=product.price* item.quantity;
            order.items.push(orderItem)
        }
        return await this.orderRepo.save(order);
    }
    async findOrdersByUser(userId: number): Promise<Order[]> {
        return await this.orderRepo.find({ where: { user: { id: userId } }, relations: ['items', 'items.product'] });
      }
      async updateOrderStatus(orderId: number, status: string): Promise<Order> {
        const order = await this.orderRepo.findOne({ where: { id: orderId } });
        if (!order) throw new Error('Order not found');
    
        order.status = status;
        return await this.orderRepo.save(order);
      } 
      async deleteOrder(orderId: number): Promise<void> {
        await this.orderRepo.delete(orderId);
      }
}
