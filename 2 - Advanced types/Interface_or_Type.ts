/* eslint no-redeclare: "off" */
const getInterfaceOrType = (): void => {
  // Types are for prime types
  type data = string | number;
  const a: data = 5;

  console.log(a);

  interface User {
    name: string,
  }

  // addition of interface
  interface User {
    age: number,
  }

  const user: User = {
    name: 'Arthur',
    age: 31,
  };

  console.log(user);
};

getInterfaceOrType();
