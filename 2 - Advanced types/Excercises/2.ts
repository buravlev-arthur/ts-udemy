interface IPayment {
	sum: number;
	from: number;
	to: number;
}

enum PaymentStatus {
	Success = 'success',
	Failed = 'failed',
}

interface IPaymentRequest extends IPayment { }

interface IDataSuccess extends IPayment {
	databaseId: number;
}

interface IDataFailed {
	errorMessage: string;
	errorCode: number;
}

interface IResponseSuccess {
	status: PaymentStatus.Success;
	data: IDataSuccess;
}

interface IResponseFailed {
	status: PaymentStatus.Failed;
	data: IDataFailed;
}

type Res = IResponseSuccess | IResponseFailed;
type f = (res: Res) => number;

const getDatabaseId: f = (response) => {
  if (isSuccess(response)) {
    return response.data.databaseId;
  } else {
    throw new Error(response.data.errorMessage);
  }
}

//type guard
const isSuccess = (response: Res): response is IResponseSuccess => {
  return response.status === PaymentStatus.Success;
}

const successData: IDataSuccess = {
  sum: 100,
  from: 12,
  to: 24,
  databaseId: 111,
};

const failedData: IDataFailed = {
  errorMessage: 'Оплата не прошла',
  errorCode: 104,
};

const dbId = getDatabaseId({ status: PaymentStatus.Success, data: successData });
console.log('database Id: ', dbId);
getDatabaseId({ status: PaymentStatus.Failed, data: failedData });

