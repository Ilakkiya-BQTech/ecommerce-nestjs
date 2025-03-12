import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async create(@Body() body: { userId: number; items: { productId: number, quantity: number }[] }) {
        return this.orderService.createOrder(body.userId, body.items);
    }
    @Get('user/:userId')
    async getOrderByUsers(@Param('userId') userId: number) {
        return this.orderService.findOrdersByUser(userId);
    }
    @Patch(':id')
    async updateStatus(@Param('id') id: number, @Body() body: { status: string }) {
        return this.orderService.updateOrderStatus(id, body.status);
    }
    @Delete(':id')
    async delete(@Param('id') id:number){
        return this.orderService.deleteOrder(id);
    }
}
