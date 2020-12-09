import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Order from '../entities/Order';
import OrdersProducts from '../entities/OrdersProducts';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  private ormItemRepository: Repository<OrdersProducts>;

  constructor() {
    this.ormRepository = getRepository(Order);
    this.ormItemRepository = getRepository(OrdersProducts);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    let order = new Order();
    order.customer = customer;

    const itens: OrdersProducts[] = [];

    products.forEach(product => {
      const orderedProduct = new Product();
      orderedProduct.id = product.product_id;

      const orderProduct = new OrdersProducts();
      orderProduct.price = product.price;
      orderProduct.quantity = product.quantity;
      orderProduct.order = order;
      orderProduct.product = orderedProduct;

      itens.push(orderProduct);
    });

    order.order_products = itens;
    order = await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });
  }
}

export default OrdersRepository;
