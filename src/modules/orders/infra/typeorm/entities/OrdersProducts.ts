import { Entity, Column, ManyToOne, Generated } from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import BaseModel from '@shared/infra/typeorm/entities/BaseModel';

@Entity()
class OrdersProducts extends BaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product, product => product.orders_products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: Product;

  // product_id: string;

  // order_id: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  price: number;

  @Column({
    type: 'integer',
  })
  quantity: number;
}

export default OrdersProducts;
