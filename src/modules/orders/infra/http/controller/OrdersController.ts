import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import { classToClass } from 'class-transformer';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { order_id: id } = request.params;

    const findOrderService = container.resolve(FindOrderService);

    const order = await findOrderService.execute({ id });

    if (order && order.order_products) {
      order.order_products = order.order_products.map(op => classToClass(op));
    }

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderService = container.resolve(CreateOrderService);
    const findOrderService = container.resolve(FindOrderService);

    const createdOrder = await createOrderService.execute({
      customer_id,
      products,
    });

    const order = await findOrderService.execute({ id: createdOrder.id });

    if (order && order.order_products) {
      order.order_products = order.order_products.map(op => classToClass(op));
    }

    return response.json(order);
  }
}
