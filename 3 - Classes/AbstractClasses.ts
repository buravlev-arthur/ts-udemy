const getAbstractClasses = () => {
  abstract class Controller { // абстрактный класс
    abstract handle(req: any): void; // абстрактный метод
    abstract status: string;

    log(req: any): void {
      console.log('Start');
      // можем вызвать абстрактный метод
      this.handle(req);
      console.log('End');
    }
  }

  // new Controller - нельзя создавать экземляр от абстр.класса

  class UserController extends Controller {
    // мы должны реализовать абстрактные методы и свойства
    status: string = ''

    handle(req: any): void {
      console.log(req);
    }
  }

  const user = new UserController();
  user.handle({ req: true });
  user.log({ req: true });
};

getAbstractClasses();