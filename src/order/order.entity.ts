// import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
// import { User } from '../users/user.entity';
// import { OrderItem } from './order-item.entity';

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, (user) => user.orders)
//   user: User;

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
//   items: OrderItem[];

//   @Column({ default: 'pending' }) 
//   status: string;

//   @CreateDateColumn()
//   createdAt: Date;
// }
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity'; // ✅ Correct path
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
