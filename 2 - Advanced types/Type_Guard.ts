const getTypeGuard = () => {
  interface User {
    name: string;
    email: string;
    login: string;
  }

  interface Admin {
    name: string;
    role: number;
  }

  const user: User = {
    name: 'Arthur',
    email: 'buravlev-arthur@yandex.ru',
    login: 'buravlev-arthur' 
  }

  const admin = <Admin> {
    name: 'John',
    role: 12,
  };

  const logId = (id: string | number) => {
    if (isString(id)) {
      console.log(id);
    } else {
      console.log(id);
    }
  };

  // type guard
  const isString = (x: string | number): x is string => {
    return typeof x === 'string';
  };

  // 1 variant
  const isAdmin = (user: User | Admin): user is Admin => {
    return 'role' in user;
  }

  // 2 variant
  const isAdminAlternative = (user: User | Admin): user is Admin => {
    return (user as Admin).role !== undefined;
  }

  const setRoleZero = (user: User | Admin) => {
    if (isAdmin(user)) {
      user.role = 0;
    } else {
      throw new Error('Пользователь не админ');
    }
  };

  console.log(admin);
  setRoleZero(admin);
  console.log(admin);
  setRoleZero(user);
};

getTypeGuard();