const getMixins = () => {
  // типы конструкторов
  type Constructor = new (...args: any[]) => {} // самый простой конструктор
  // T = {} - значение по умолчанию
  type GConstructor<T = {}> = new (...args: any[]) => T

  class List {
    constructor(public items: Array<string>) {}
  }

  class Accordion {
    isOpened: boolean = false;
  }

  class AccordionList {
    isOpened: boolean = false;
    constructor(public items: Array<string>) {}
  }

  type ListType = GConstructor<List>;
  type AccordionType = GConstructor<Accordion>;

  // mixin
  const ExtendedList = <TBase extends ListType & AccordionType>(Base: TBase) => {
    return class ExtendedList extends Base {
      getFirst() {
        return this.items[0];
      }
    }
  }

  const list = ExtendedList(AccordionList);

  const res = new list(['abc', 'def', 'ghi']);
  console.log(res.getFirst(), res.isOpened);
};

getMixins();