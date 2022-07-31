const getExcerciseOne = (): void => {
  interface PaymentData {
    sum: number,
    from: number,
    to: number,
  }

  enum ResponseStatus {
    success = 'success',
    failed = 'failed',
  }

  interface ResponseSuccess {
    status: ResponseStatus.success,
    data: PaymentData & { databaseId: number },
  }

  interface ResponseFailed {
    status: ResponseStatus.failed,
    data: {
      errorMessage: string,
      errorCode: number,
    },
  }

  interface Request extends PaymentData {}

  const getData = (req: Request): ResponseSuccess | ResponseFailed => ({
    status: ResponseStatus.success,
    data: { ...req, databaseId: 500 },
  });

  console.log(getData({ sum: 300, from: 2, to: 4 }));
};

getExcerciseOne();
