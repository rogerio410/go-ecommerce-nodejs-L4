import { Entity, Column, OneToMany, Generated } from 'typeorm';

import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import BaseModel from '@shared/infra/typeorm/entities/BaseModel';

@Entity('products')
class Product extends BaseModel {
  @Column({
    primary: true,
    type: 'uuid',
  })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

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

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];
}

export default Product;
