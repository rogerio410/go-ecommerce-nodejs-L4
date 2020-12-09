import { Entity, ManyToOne, OneToMany, Column, Generated } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import BaseModel from '@shared/infra/typeorm/entities/BaseModel';

@Entity()
class Order extends BaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Customer, customer => customer.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orders_products => orders_products.order)
  order_products: OrdersProducts[];
}

export default Order;
