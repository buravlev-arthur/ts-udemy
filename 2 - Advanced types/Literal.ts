const getLiteral = (): void => {
  const fetchWithAuth = (url: string, method: 'post' | 'get'): 1 | -1 => {
    return -1;
  };

  let method = 'get';
  fetchWithAuth('s', method as 'get'); // Warning! It's not good solution.
};

getLiteral();