// import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import * as  bcrypt from 'bcryptjs';
// import { Order } from "src/order/order.entity";

// @Entity()
// export class User{
//     @PrimaryGeneratedColumn()
//     id:number;
//     @Column({unique:true})
//     username:string;
//     @Column()
//     password:string;
//     @OneToMany(()=>Order,(order)=>order.user)
//     orders:Order[];
//     @BeforeInsert()
//     async hashPassword(){
//         const salt = await bcrypt.genSalt(10);
//         this.password= await bcrypt.hash(this.password,salt)
//     }
//     async validatePassword(password: string): Promise<boolean> {
//         return bcrypt.compare(password, this.password);
//       }

// }
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Order } from '../order/order.entity'; // ✅ Correct path
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
