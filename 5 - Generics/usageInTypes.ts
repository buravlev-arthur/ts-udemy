const usageInTypes = () => {
  const getFirstHalf = <T>(data: Array<T>): Array<T> => {
    const halfLength = data.length / 2;
    return data.splice(0, halfLength);
  };

  // типизируем функцию
  const split: <T>(data: Array<T>) => Array<T> = getFirstHalf;
  // не принципиален литерал внутри generic'а
  const split2: <TYPE>(data: Array<TYPE>) => Array<TYPE> = getFirstHalf;

  // generic'и в объектах
  type LogType<T> = Array<T> 

  interface ILogLine<T, S> {
    timestamp: Date;
    data: T;
    log: S;
  }

  const logLine: ILogLine<{ a: number }, LogType<boolean>> = {
    timestamp: new Date(),
    data: {
      a: 1,
    },
    log: [true, false, true, false],
  };
};

usageInTypes();