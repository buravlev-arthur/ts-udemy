const getCastTypes = () => {
  const a = 5;
  const b: string = String(a);
  const e: string = new String(a).valueOf();
  const f: boolean = new Boolean(a).valueOf();

  const c = 'str';
  const d: number = +c; // + string to number / parseInt(), parseFloat()
  console.log(d);

  interface User {
    name: string;
    email: string;
    login: string;
  }

  // 1 variant
  /*const user: User = {
    name: 'Arthur',
    email: 'buravlev-arthur@yandex.ru',
    login: 'buravlev-arthur' 
  }*/

  // 2 variant
  /*const user = {
    name: 'Arthur',
    email: 'buravlev-arthur@yandex.ru',
    login: 'buravlev-arthur' 
  } as User*/

  // 3 variant
  const user = <User> {
    name: 'Arthur',
    email: 'buravlev-arthur@yandex.ru',
    login: 'buravlev-arthur' 
  }

  interface Admin {
    name: string;
    role: number;
  }

  const admin = <Admin> { // имеет лишние свойства от User
    ...user,
    role: 1,
  };

  const userToAdmin = (user: User): Admin => {
    return {
      name: user.name,
      role: 1,
    };
  };

  const admin2 = <Admin> userToAdmin(user); // правильное преобразование
  console.log(admin2);
};

getCastTypes();