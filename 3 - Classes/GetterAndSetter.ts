const getGetterAndSetter = () => {
  class User {
    _login?: string
    _username?: string
    password?: string
    createdAt?: Date

    set login(login: string) {
      this._login = `user-${login}`;
      this.createdAt = new Date();
    }

    get login() {
      return this._login ? this._login.slice(5) : '';
    }

    // определен только getter, поэтому username - readonly
    get username() { 
      return this._username;
    }

    // async не поддерживается getter'ами и setter'ами
    async setPassword(password: string) {
      this.password = await password.split('').reverse().join('') + '_crypt';
    }
  }

  const user = new User();
  user.login = 'John';
  user.setPassword('pa$$word')
    .then(() => {
      console.log('user obj: ', user);
      console.log('login of user: ', user.login);
    });
};

getGetterAndSetter();