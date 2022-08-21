const getStatic = () => {
  class UserService {
    // name уже встроен в класс и переопределить его мы не можем
    // static name: string;
    static db: any;
    private somedata: any; // можно использовать private/protected/public

    // можем использовать async/await
    static getUser(id: number) {
      return UserService.db.findUser(id);
    }

    getDB() {
      return UserService.db;
    }

    // статичный блок - инициализатор класса
    // async/await использовать нельзя
    static {
      UserService.db = '...';
    }
  }

  // получаем статичное свойство/метод без создани экземпляра класса
  UserService.db
  UserService.getUser(1);
  // получаем не статичный метод, который возвращает статичное свойство
  const inst = new UserService();
  inst.getDB();
};

getStatic();