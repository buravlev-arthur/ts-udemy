const getIntegratedGenerics = () => {
  const num: Array<number> = [1, 2, 3];

  const test = async () => {
    const a = await new Promise<number>((resolve, reject) => {
      resolve(1); 
    })
  };

  // 1 параметр - тип ключа словаря (Record), 2 параметр - тип значения
  const autoState: Record<string, boolean> = {
    drive: true,
    turnWheels: false,
  };

};

getIntegratedGenerics();