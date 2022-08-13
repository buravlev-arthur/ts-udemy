const getNever = () => {
  const generateMessage = (message: string): never => {
    throw new Error(message);
  };

  const reqursion = (): never => {
      return reqursion();
  }

  const a: void = undefined; // good
  // const b: never = undefined; // no

  type payment = 'refund' | 'checkout' | 'reject';

  const process = (action: payment) => {
    switch (action) {
      case 'refund':
        // ...
        break;
      case 'checkout':
        // ...
        break;
      case 'reject':
          // ...
          break;
      default:
        const _: never = action;
        throw new Error('Нет такого action');
    }
  };

  const isString = (s: string | number): boolean => {
    if (typeof s === 'string') {
      return true;
    } else if (typeof s === 'number') {
      return false;
    }

    throw new Error('Ошибка типов данных');
  };

  console.log(isString('a'));
};

getNever();