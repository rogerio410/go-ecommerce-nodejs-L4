import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    const findProducts = await this.productsRepository.findAllById(products);

    const orderedProducts: any[] = [];

    products.forEach(product => {
      const findProduct = findProducts.find(fp => fp.id === product.id);

      if (!findProduct) {
        throw new AppError('Invalid product sent. Check them and try again');
      }

      if (findProduct.quantity < product.quantity) {
        throw new AppError(
          `Insuficient quantity for product ${findProduct?.name}`,
        );
      }

      // update quantity
      findProduct.quantity -= product.quantity;

      orderedProducts.push({
        product_id: findProduct.id,
        price: findProduct.price,
        quantity: product.quantity,
      });
    });

    const order = await this.ordersRepository.create({
      customer,
      products: orderedProducts,
    });

    await this.productsRepository.updateQuantity(findProducts);

    return order;
  }
}

export default CreateOrderService;
