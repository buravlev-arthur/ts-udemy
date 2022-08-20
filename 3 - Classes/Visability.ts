const getVisability = () => {
  class Vehicle {
    mark!: string; // по-умолчанию публичное свойство
    public seriesNumber!: number;
    // приватные свойства и методы недоступны снаружи и в дочерних классах
    private damages!: string[];
    private _model!: string;
    // protected недоступен снаружи, но доступен в дочерних классах
    protected run!: number;
    // js-стиль приватных свойств (# в начале)
    #price!: number;

    set model(model: string) {
      this._model = model;
    }

    get model() {
      return this._model;
    }

    set price(price: number) {
      this.#price = price;
    }

    get price() {
      return this.#price;
    }

    public isPriceEqual(v: Vehicle) {
      // особенность JS: имеем доступ к приватному свойству внешнего объекта
      return this.#price === v.#price;
    }
 
    public addDamage(damage: string) {
      this.damages.push(damage);
    }
  }

  const automobile = new Vehicle();
}

getVisability();