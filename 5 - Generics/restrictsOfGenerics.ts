const getRestrictsOfGenerics = () => {
  class Vehicle {
    constructor(public run: number) {}
  };

  class Lorry extends Vehicle {
    constructor(
      public override run: number,
      public capacity: number
    ) {
      super(run);
    }
  } 
  
  // чтобы свойство run было доступно внутри функции, мы указываем, чем точно должен быть T
  // так мы ограничиваем Generic, указывая, чем он может быть
  // экстендить можно классы, интерфейсы и типы
  const kmToMiles = <T extends Vehicle>(vehicle: T): T => {
    vehicle.run = Math.ceil(vehicle.run / 0.62);
    return vehicle;
  };

  const auto1 = new Vehicle(100500);
  const auto2 = new Lorry(400300, 118);

  console.log(kmToMiles(auto1));
  // можно передавать объекты-наследники
  console.log(kmToMiles(auto2));
  // можно передавать даже не инстансы класса, а обычные объекты, которые удовлетворяют интерфейсу
  console.log(kmToMiles({ run: 100 }));

  // extend примитивов
  type IdType = string | number
  type AdditionalType = Record<string, number>
  type ReturnType<T extends { id: IdType, additional: AdditionalType}> = T

  const logId = <T extends IdType, Y extends AdditionalType>(id: T, additionalData: Y): ReturnType<{ id: T, additional: Y}> => {
    console.log('id: ', id);
    return {
      id,
      additional: additionalData,
    };
  };

  console.log(logId(15, { 'a': 5 }))
};

getRestrictsOfGenerics();