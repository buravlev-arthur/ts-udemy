const functionWithGeneric = () => {
  // универсальная функция, принимающая любой тип данных в data и возвращающая его же
  const logMiddleware = <T>(data: T): T => {
    return data;
  };

  // принимает и возвращает number
  const res = logMiddleware<number>(10);
  // принимает и возвращает string
  const res2 = logMiddleware<string>('log me please');

  console.log(res, res2);

  // возвращает первую половину массива
  const getFirstHalf = <T>(data: Array<T>): Array<T> => {
    const halfLength = data.length / 2;
    return data.splice(0, halfLength);
  };

  // отдаём массив типа number
  const half = getFirstHalf<number>([1, 5, 10, 12, 16, -8]);

  // отдаём массив типа string
  const half2 = getFirstHalf<string>(['a', 'e', 'z', 'g', 'c', 'l']);

  console.log(half, half2);
};

functionWithGeneric();