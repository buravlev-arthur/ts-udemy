const genericsEx1 = () => {
  const toString = <T>(data: T): string | undefined => {
    if (Array.isArray(data)) {
      return String(data)
    };

    switch (typeof data) {
      case 'string':
        return data;
      case 'number':
      case 'boolean':
      case 'function':
      case 'bigint':
      case 'symbol':
        return String(data);
      case 'object':
        return JSON.stringify(data);
      default:
        return undefined;
    };
  }

  console.log(toString('abc'), toString(100), toString({ a: 'abc', b: 15 }), toString(true), toString(function() { return true }), toString([1, 5, 12, 22]));
};

genericsEx1();