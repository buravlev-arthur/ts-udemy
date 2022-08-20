const getEx2 = () => {
  enum check {
    success = 'Всё хорошо',
    noGoods = 'Нет товаров',
    noDelivery = 'Не выбран способ доставки',
  }

  interface IDeliveryToHome {
    date: Date,
    address: string,
  }

  interface IDeliveryToPoint {
    date: Date,
    shopId: number,
  }

  class Cart {
    private productsList: Array<Product> = [];
    private deliveryParams: Delivery | undefined;

    addProduct(product: Product): void {
      this.productsList.push(product);
    }

    removeProduct(id: number): void {
      this.productsList = this.productsList.filter((p: Product) => p.id != id);
    }

    getTotalCost(): number {
      return this.productsList.reduce((sum, { cost }) => sum += cost, 0);
    }

    toOrderDelivery(params: Delivery) {
      this.deliveryParams = params;
    }

    checkout(): string {
      const { productsList, deliveryParams } = this
      if (!productsList.length) {
        throw new Error(check.noGoods);
      }
      if (!deliveryParams) {
        throw new Error(check.noDelivery);
      }
      return check.success;
    }
  }

  class Product {
    constructor(
      public id: number,
      public name: string,
      public cost: number
    ) {}
  }

  class Delivery implements IDeliveryToHome, IDeliveryToPoint {
    date: Date;
    address!: string;
    shopId!: number;

    constructor(address: string, date: Date);
    constructor(shopId: number, date?: Date);
    constructor(addressOrShopId: string | number, date: Date = new Date()) {
      this.date = date;

      if (typeof addressOrShopId == 'string') {
        this.address = addressOrShopId;
      }

      if (typeof addressOrShopId == 'number') {
        this.shopId = addressOrShopId;
      }
    }
  }

  /* Проверка */
  const p1 = new Product(1, 'Арбуз', 118);
  const p2 = new Product(2, 'Печенье', 120);
  const p3 = new Product(3, 'Молоко', 82);
  const delivery = new Delivery('СПБ, ул. Промышленная, д.12', new Date());

  const cart = new Cart();
  // console.log('check 1: ', cart.checkout());
  cart.addProduct(p1);
  cart.addProduct(p2);
  cart.addProduct(p3);
  console.log('Total cost 1: ', cart.getTotalCost());
  cart.removeProduct(2);
  console.log('Total cost 2: ', cart.getTotalCost());
  // console.log('check 2: ', cart.checkout());
  cart.toOrderDelivery(delivery);
  console.log('check 3: ', cart.checkout());
};

getEx2();