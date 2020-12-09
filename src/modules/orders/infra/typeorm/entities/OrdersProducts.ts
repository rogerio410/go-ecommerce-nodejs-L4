import { Entity, Column, ManyToOne, Generated } from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import BaseModel from '@shared/infra/typeorm/entities/BaseModel';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders_products')
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
    eager: true,
  })
  @Exclude()
  order: Order;

  @ManyToOne(() => Product, product => product.order_products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @Exclude()
  product: Product;

  @Expose({ name: 'product_id' })
  public getProductId(): string {
    return this.product.id;
  }

  @Expose({ name: 'order_id' })
  public getOrderId(): string {
    return this.order.id;
  }

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
