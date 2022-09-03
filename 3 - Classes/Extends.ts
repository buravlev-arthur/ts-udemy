const getExtends = () => {
  type PaymentStatus = 'new' | 'paid'

  class Payment {
    id: number;
    status: PaymentStatus = 'new';

    constructor(id: number) {
      this.id = id;
    }

    pay() {
      this.status = 'paid';
    }
  }

  class PersistedPayment extends Payment {
    databaseId!: number;
    paidAt!: Date;

    constructor() {
      const id = Math.random();
      super(id);
    } 
    
    // новый метод
    save() {
      // что-то делаем
    }

    // переопределяем метод (date - опциональный, т.к. в методе род.класса параметров нет)
    override pay(date?: Date) {
      // вызываем этот же метод у родительского класса
      super.pay(); 

      if (date) {
        this.paidAt = date;
      }
    }
  }

  const payment = new PersistedPayment();

  /* Порядок вызова конструкторов */
  class User {
    name: string = 'user'; // 1

    constructor() { // 2
      console.log('user name: ', this.name);
    }
  }

  class Admin extends User {
    override name: string = 'admin'; // 3

    constructor() { // 4
      super();
      console.log('admin name: ', this.name);
    }
  }

  new Admin();

  /* Наследование существующих классов в JS */
  class MyError extends Error {
    override message: string
    code?: number

    constructor(message: string, code?: number) {
      super();
      this.message = message;
      this.code = code ?? 500;
    }

    show() {
      console.error(this.code, this.message);
    }
  }

  const pageError = new MyError('Страница не найдена', 404);
  pageError.show();
}

getExtends();