const getImplements = () => {
  interface ILogger {
    log(...args: any[]): void;
    error(...args: any[]): void;
  }

  class Logger implements ILogger {
    log(...args: any[]): void {
      console.log(...args);
    }
    async error(...args: any[]): Promise<void> {
      console.log(...args);
    }
  }

  interface IPayable {
    pay(paymentId: number): void;
    price?: number;
  }

  interface IDeletable {
    delete(): void;
  }

  class User implements IPayable, IDeletable {
    delete(): void {
      // что-то делаем
    }
    pay(paymentId: number): void {
      // что-то делаем
    }
    price?: number | undefined;
  }
}

getImplements();