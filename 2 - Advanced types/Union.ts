const App = (): void => {
  const logId = (id: string | number | boolean): void => {
    if (typeof id === 'string') { //Narrowing
      console.log(id.toLowerCase());
    } else if (typeof id === 'number') {
      console.log(id + 5);
    } else {
      console.log(id ? 'yes': 'no');
    };
  };

  logId(1);
  logId('abc');
  logId(true);

  const logError = (err: string | string[]): void => {
    if (Array.isArray(err)) {
      err.forEach((e) => console.log(e));
    } else {
      console.log(err);
    };
  };

  logError(['err #1', 'err #2', 'err #3']);
  logError('err #4');

  const logObject = (obj: { a: number } | { b: number }): void => {
    if ('a' in obj) {
      console.log('a: ', obj.a);
    } else {
      console.log('b: ', obj.b);
    };
  };

  logObject({ a: 5 });
  logObject({ b: 10 });

  const logMultipleIds = (a: string | number, b: string | boolean): void => {
    if (a === b) {
      console.log('a has the same type of b and equals: ', a);
    } else {
      console.log('a and b have the different types; a  = ', a, '; b = ', b);
    };
  };

  logMultipleIds(1, true);
  logMultipleIds('1', '1');
};

App();