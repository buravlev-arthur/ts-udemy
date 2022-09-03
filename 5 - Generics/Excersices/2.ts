const genericsEx2 = () => {
  const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' },
  ];

  enum SortType {
    UP = 'up',
    DOWN = 'down',
  }

  interface IObjectWithId {
    id: number
  }

  const sortById = <OBJ extends Array<IObjectWithId>, SORT extends SortType>(data: OBJ, sort?: SORT): OBJ => {
    return data.sort((a, b) => {
      if (sort === SortType.UP || sort === undefined) {
        return a.id > b.id ? 1 : -1;
      }
      return a.id < b.id ? 1 : -1; 
    })
  }

  console.log('sort up: ', sortById(data, SortType.UP));
  console.log('sort down: ', sortById(data, SortType.DOWN));
  console.log('without sort: ', sortById(data));
};

genericsEx2();