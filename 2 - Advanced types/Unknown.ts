const getUnknown = () => {
  let input: unknown;

  input = 'str'; // we can put there enything

  // const str: string = input; // need to use eigher any or unknown

  const run = (i: unknown): string | void => {
    if (typeof i === 'string') {
      return i;
    }
  }

  const a = run(input) + ' add';
  console.log(a);

  const getData = async () => {
    try {
      await fetch('');
    } catch (error) {
      // 1 variant
      if (error instanceof Error) {
        console.log(error.message);
      }

      // 2 variant (bad!)
      const e = error as Error;
    }
  };
  getData();

  type U1 = unknown | null | string; //U1 everytime - unknown
  type U2 = unknown & string; // U2 - string
};

getUnknown();