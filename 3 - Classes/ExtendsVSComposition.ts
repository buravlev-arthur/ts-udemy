const EvC = () => {
  class User {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class Users extends Array<User> {
    searchByname(name: string) {
      return this.filter((user) => user.name == name);
    }

    override toString(): string {
      return this.map((user) => `${user.name}`).join(', ');
    }
  }

  const users = new Users();
  users.push(new User('John'));
  users.push(new User('Adam'));
  // В users очень много лишних методов и свойств от класса Array
  console.log(users.toString());

  //Лучше определить класс только с нужными методами и свойствами
  class UsersList {
    users: User[]

    constructor(users: Array<User> = []) {
      this.users = users;
    }

    push(user: User) {
      users.push(user);
    }

    // и так далее
  }

  /* Композиция */
  // class UserWithPayment extends User, Payment - плохой вариант
  // т.к. мы смешиваем домены модели данных (пользователей с платежами)

  class Payment {
    paymentId: number;

    constructor(id: number) {
      this.paymentId = id;
    }
  }

  class UserWithPayment {
    user: User;
    payment: Payment;

    constructor(user: User, payment: Payment) {
      this.user = user;
      this.payment = payment;
    }
  }
};

EvC();