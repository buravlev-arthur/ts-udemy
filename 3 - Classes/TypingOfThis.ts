const getTypingThis = () => {
  class UserBuilder {
    name: string = '';

    // this как тип эквивалентен UserBuilder
    setName(name: string): this {
      this.name = name;
      return this;
    }

    // type guard для проверки this
    isAdmin(): this is AdminBuilder {
      return this instanceof AdminBuilder;
    }
  }

  // AdminBuilder и UserBuilder должны отличаться по структуре
  class AdminBuilder extends UserBuilder {
    roles: string[] = []
  }

  const res = new UserBuilder().setName('John'); 
  // res2 будет ссылаться уже на AdminBuilder
  const res2 = new AdminBuilder().setName('Adam');

  let user: UserBuilder | AdminBuilder = new UserBuilder();
  if (user.isAdmin()) {
    console.log(user); // AdminBuilder
  } else {
    console.log(user); // UserBuilder
  }
};

getTypingThis();