import Order from '@modules/orders/infra/typeorm/entities/Order';
import BaseModel from '@shared/infra/typeorm/entities/BaseModel';
import { Entity, Column, Generated, OneToMany } from 'typeorm';

@Entity('customers')
class Customer extends BaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Order, orders => orders.customer)
  orders: Order[];
}

export default Customer;
