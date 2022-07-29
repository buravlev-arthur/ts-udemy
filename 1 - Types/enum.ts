const app = (): void => {
  // 1 - успех; 10 - в процессе; 4 - отклонён
  enum StatusCode {
    SUCCESS = 1,
    IN_PROCESS = 10,
    FAILED = SUCCESS + IN_PROCESS,
  }

  const result: { message: string, statusCode: StatusCode } = {
    message: 'Success payment',
    statusCode: StatusCode.SUCCESS,
  };

  if (result.statusCode === StatusCode.SUCCESS) {
    console.log('The payment was complited successful');
  }

  const action = (status: StatusCode): void => {
    console.log('Action: ', status);
  }

  action(StatusCode.IN_PROCESS);

  //const enums
  const enum Roles {
    ADMIN = 1,
    USER = 2,
    MODERATOR = 3,
  }

  const admin = Roles.ADMIN;
  console.log('Role number: ', admin);
};

app();

