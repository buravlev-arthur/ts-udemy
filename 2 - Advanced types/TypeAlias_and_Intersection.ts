const getTypeAlias = (): void => {
  type httpMethod = 'post' | 'get'; // Alias
  type coolString = string;

  const fetchWithAuth = (url: coolString, method: httpMethod): 1 | -1 => {
    return -1;
  };

  fetchWithAuth('str', 'post');

  type User = {
    name: string,
    age: number,
    skills: string[],
  };

  type Role = {
    roleId: number,
  };

  type Service = {
    serviceId: number,
    name: string,
  };

  type UserWithRole = User & Role; // Intersection

  type FullUserData = { // Composition
    user: User,
    role: Role,
    service: Service,
  };

  const user: UserWithRole = {
    roleId: 1,
    name: 'Arthur',
    age: 31,
    skills: ['1', '2'],
  };

  const user2: FullUserData = {
    user: {
      name: 'John',
      age: 29,
      skills: ['1', '2'],
    },
    role: {
      roleId: 1,
    },
    service: {
      serviceId: 1,
      name: 'website',
    },
  };

  console.log('user 1: ', user);
  console.log('user 2', user2);
};

getTypeAlias();