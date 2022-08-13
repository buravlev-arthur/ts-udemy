const getNull = (): void => {
  const n: null = null;
  const n2: any = null;
  // const n3: number = null;
  // const n4: boolean = null;
  // const n5: undefined = null; // !!!

  interface User {
    name: string,
  };

  const getUser = () => {
    if (Math.random() > 0.5) {
      return null;
    } else {
      return {
        name: 'Arthur',
      } as User;
    }
  }
  
  const user = getUser();
  if (user) {
    const username = user.name;
    console.log(username);
  }
};

getNull();