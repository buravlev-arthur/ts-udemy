const genericInClasses = () => {
  // определение класса с generic
  class Resp<D, E> {
    constructor(
      public date?: D,
      public error?: E
    ) {}
  }

  // создание экземляра класса с generic
  const res = new Resp<string, number>('data', 404);

  // наследование класса с generic
  class HTTPResp<F> extends Resp<string, number> {
    constructor(public code?: F) {
      super();
    }

    setCode(code: F): void {
      this.code = code;
    }
  }

  const res2 = new HTTPResp<string>('error_code_404');
};

genericInClasses();