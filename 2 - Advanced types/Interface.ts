const getInterface = (): void => {
  interface User {
    name: string,
    age: number,
    skills: string[],
    log: (id: number) => string;
  }

  interface Role {
    roleId: number,
  }

  interface UserWithRole extends User, Role {
    createdAt: Date,
  }

  const user: UserWithRole = {
    roleId: 1,
    name: 'Arthur',
    age: 31,
    skills: ['1', '2'],
    createdAt: new Date(),
    log: (id) => `id: ${id}`,
  };

  interface UserDictionary {
    [index: number]: UserWithRole,
  }

  const users: UserDictionary = {
    1: user,
  };

  console.log('user: ', user);
  console.log('users: ', users);
};

getInterface();
