const getOptional = (): void => {
  interface User {
    login: string,
    password?: string, // optional property
    role: string | undefined, // need to define anyway
  }

  const user: User = {
    login: 'a@a.com',
    role: undefined,
  };

  console.log(user);

  const multiply = (first: number, second?: number, third: number = 5): number => {
    if (!second) {
      return first * first * third;
    }

    return first * second * third;
  };

  console.log(multiply(3));

  type passwordType = 'primary' | 'secondary';

  interface UserPro {
    login: string,
    password? : {
      type: passwordType,
    },
  }

  const testPass = (userData: UserPro): passwordType | undefined => {
    const t = userData.password?.type; // ? - optional chain
    // const s = userData.password!.type; // ! - 100% there will be passwordType (not undefined)
    return t;
  };

  console.log(testPass({ login: 'abc' }));

  const test = (param?: string): string | number => {
    const t = param ?? multiply(5);
    return t;
  };

  console.log(test());
};

getOptional();
