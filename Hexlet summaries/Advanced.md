# Продвинутый TypeScript

## Классы

Описание класса в TypeScript. Поля класса обязательно должны быть инициализированы в конструкторе:

```typescript
class Point {
    x: number;
    y: number;

    // возвращаемый тип у конструктора не указывается
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
};
```

Поле класса - это данные самого класса (в классе мы определяем поля). Со свойствами работает в экземпляре класса - объекте. Свойство может быть не самим полем, а геттером или сеттером:

```typescript
class Point {
    x: number;
    y: number;

    // возвращаемый тип у конструктора не указывается
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    // геттер
    get position(): string {
        return `${this.x}, ${this.y}`
    }
    // сеттеры
    set pointX(x: number) {
        this.x = x;
    }
    set pointY(y: number) {
        this.y = y;
    }
};

const point = new Point(1, 1);
// свойство position есть, а поля такого в классе нет
console.log(point.position); // 1, 1

// свойства pointX, pointY есть, но полей таких в классе нет
point.pointX = 10; 
point.pointY = 20;
console.log(point.position); // 10, 20
```

Можно сразу определить значения полей:

```typescript
class Point {
    x = 0; // тип number выводятся автоматически из значения
    y = 0;
}

const point = new Point();
console.log(point.x, point.y); // 0, 0
```


## Классы как типы

Классы в TypeScript - это и типы и значения одновременно.

```typescript
class Point {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
};

function isEqual(point1: Point, point2: Point): boolean { // класс Point использован в качестве типа параметра
    return point1 === point2;
}

const point = new Point(0, 1);
isEqual(new Point(0, 1), new Point(0, 1)); // ok
isEqual({ x: 0, y: 1 }, { x: 0, y: 1 }); // ошибка - в объекте есть приватные поля, поэтому требуются экземляры класса (выше)
```

## Защита свойств и методов

В Typescript свойства и методы можно определять как публичные (`public`), приватные (`private`) и защищенные (`protected`):

```typescript
class Point {
    private x: number;
    private y: number;
    protected quarter: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.quarter = this.getQuarter();
    }

    protected getQuarter(): number {
        if (this.x < 0 && this.y > 0) return 1;
        if (this.x < 0 && this.y < 0) return 4;
        if (this.x > 0 && this.y > 0) return 2;
        if (this.x > 0 && this.y < 0) return 3;
        return - 1;
    }

    private compareCoords(): boolean {
        return this.x === this.y;
    }

    public isEqualCoords(): boolean {
        return this.compareCoords();
    }
};

class ExtraPoint extends Point {
    public quarter: number;

    constructor(x: number, y: number) {
        super(x, y);
        this.quarter = this.getQuarter(); // ок - защищенный метод доступен в дочерних классах
    }
};

const point = new Point(0, 1);
point.isEqualCoords(); // ok
point.compareCoords(); // ошибка - метод приватный
point.getQuarter(); // ошибка - это защищенный метод
point.quarter; // ошибка - в классе Point поле защищено
const extraPoint = new ExtraPoint(0, 1);
extraPoint.quarter; // ок - в класе ExtraPoint поле "quarter" переопределено на публичное
```

## Свойства параметров

В TypeScript заполнение полей класса можно организовать прямо в определении параметров:

```typescript
class Point {
    constructor(public x: number, public y: number) {}
}
const point = new Point(1, 1);
console.log(point.x, point.y); // 1, 1
```

Код выше - аналог этого кода:

```typescript
class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
```

## Наследование

Наследование в TypeScript только одиночное, но вложенность наследования бесконечная. Наследование реализуется при помощи ключевого слова `extends`:

```typescript
class A {
    constructor(public a: number) {}
}

class B extends A {
    constructor(a: number, public b: number) {
        super(a);
    }
}
```

При переопределении методов в дочерних классах сигнатура должна сохраняться, или должны выполнятся условия:

- тип параметров может быть шире или уже;
- тип возвращаемого результата может быть такой же или только уже.

```typescript
// ok, можно расширять типы параметров и сужать тип возвращаемого результата
class AFactory1 extends A {
    fn(a: number | string, b: string | boolean): false {
        return false;
    }
}

// ok, можно также типы параметров сужать
class AFactory2 extends A {
    fn(a: 1, b: 'literal string'): true | 'ok' {
        return true;
    }
}

// ок, можно указывать меньше параметров (или вообще переопределять метод без параметров)
class AFactory3 extends A {
    fn(a: number): boolean | 'ok' {
        return true;
    }
}

// error, расширять тип возвращаемого результата нельзя
class AFactory4 extends A {
    fn(a: number, b: string): boolean | string {
        return true;
    }
}

// error, дополнительные параметры определять нельзя
class AFactory5 extends A {
    fn(a: number, b: string, c: boolean): true {
        return true;
    }
}
```


## Статические методы и свойства

Можно определять методы и свойства, которые будут доступны только через сам класс и хранить статичные значения (не изменяемые в экземплярах класса) при помощи модификатора `static`:

```typescript
type ImageFileData = {
    width: number;
    height: number;
    name: string;
    size: number;
    isTooBig: boolean;
};

class ImageFile {
    private static readonly maxImageSize = 1000;

    constructor(protected name: string, protected size: number) {
        if (ImageFile.isTooBigImage(size)) {
            throw new Error('The image has too big size. Try to use an image with size lower than 1000 bytes');
        }
    }

    protected static isTooBigImage(size: number): boolean {
        return size > ImageFile.maxImageSize;
    }

    static isImageFile(image: ImageFile): boolean {
        return image instanceof ImageFile;
    }
};

class ImageFileExtended extends ImageFile {
    constructor(name: string, size: number, private width: number, private height: number) {
        super(name, size);
    }

    get data(): ImageFileData {
        return {
            width: this.width,
            height: this.height,
            name: this.name,
            size: this.size,
            isTooBig: ImageFile.isTooBigImage(this.size) // ok, защищенный метод используется в дочернем классе
            isTooBig: ImageFileExtended.isTooBigImage(this.size), // можно получить доступ к статическому методу через дочерний класс
        }
    }
};

const image = new ImageFile('image.png', 900);
image.isImageFile(new ImageFile('image.png', 500)); // ошибка, это метод самого класса: ImageFile.isIamgeFile()

ImageFile.isImageFile(new ImageFile('image.png', 900)); // ок

ImageFile.isTooBigImage(500); // ошибка, это защищенный метод. Доступен только в классе и дочерних классах

const extendedImage = new ImageFileExtended('image.png', 900, 100, 100);
extendedImage.data;
```

Точно так же статическим методам и свойства можно добавлять модификатора доступа и `readonly`.

## Абстрактные классы

Абстрактные классы нужны для описания общей структуры нескольких классов, где повторяются методы и поля. Экземляр абстрактного класса создать нельзя, его можно только наследовать.
Абстрактный класс определяется через ключевое слово `abstract`. Также через ключевое слово `abstract` определяются методы и свойства, которые требуется определить в классах-наследниках:

```typescript
abstract class FileData {
    constructor(protected name: string, protected size: number) {}

    protected getSizeKB(): number {
        return Number((this.size / 1024).toFixed(2));
    }

    // требуется описать в дочерних классах
    public abstract data: { name: string, size: number };

    // требуется описать в дочерних классах
    public abstract getDataAsString(): string;
};

class ImageFileData extends FileData {
    constructor(name: string, size: number, private width: number, private height: number) {
        super(name, size);
    }

    // абстрактный класс-родитель требует определить свойство data в дочерних классах
    get data() {
        return {
            name: this.name,
            size: this.getSizeKB()
        }
    }

    // абстрактный класс-родитель требует определить метод getDataAsString() в дочерних классах
    getDataAsString() {
        return `${this.name}, size: ${this.getSizeKB()} kb`;
    }
}

const file = new FileData('file.png', 2000); // error - нельзя создать экземпляр абстрактного класса

const image = new ImageFileData('image.png', 2400, 100, 100);
image.getSizeKB(); // error - это защищенный метод, доступен только в дочерних классах
console.log(image.data);
console.log(image.getDataAsString());
```

Абстрактный класс может использоваться как тип. Также абстрактный класс может наследовать другой абстрактный класс.

## Интерфейсы

В функциональном TS интерфейсы ничем не отличаются от объектых типов:

```typescript
type FooType = {
    prop: boolean;
}

interface FooInterface {
    prop: boolean;
}
```

Но через интерфейсы можно реализовывать классы (ключевое слово `implements`), а затем в качестве параметров функций использовать эти интерфейсы, позволяя функции принимать экземпляры всех классов, реализованных через данный интерфейс:

```typescript
interface ICounter {
    count: number;
    getCount(): number;
}

class A implements ICounter {
    constructor(public count: number) {}

    public getCount(): number {
        return this.count;
    }
};

class B implements ICounter {
    constructor(public count: number) {}

    public getCount(): number {
        return this.count * 10 - 10;
    }
};

function getCountTotal(obj: ICounter): number {
    return obj.getCount();
}

// создаём экземпляр каждого класса
const a = new A(10);
const b = new B(10);

getCountTotal(a); // 10
getCountTotal(b); // 90
```

## Использование интерфейсов

Расширение с помощью слияния деклараций:

```typescript
interface IUser {
    username: string;
}

interface IUser {
    login: string;
    password: string
};

const user: IUser = {
    username: 'John',
    login: 'john',
    password: '123456'
}
```

Расширение с помощью другого интефрейса:

```typescript
interface IUser {
    username: string;
}

interface IStudent extends IUser {
    group: number;
};

const student: IStudent = {
    username: 'John',
    group: 212545,
};
```

Расширение нескольких интерфейсов:

```typescript
interface IPerson {
    name: string;
}

interface IUser {
    login: string;
    password: string;
};

interface IAccount extends IPerson, IUser {
    createdAt: Date
}

const account: IAccount = {
    name: 'John',
    login: 'john',
    password: '123456',
    createdAt: new Date(),
};
```

Создание Intersection Types

```typescript
interface IPerson {
    name: string;
}

interface IUser {
    login: string;
    password: string;
};

type IAccount = IPerson & IUser;

const account: IAccount = {
    name: 'John',
    login: 'john',
    password: '123456',
};
```

Разница между множественным наследованием интерфейсов и Intersection Types в том, что определение одного и того же метода с разной сигнатурой при наследовании будет выдавать ошибку:

```typescript
interface IPerson {
    name: string;
    getName(fill: boolean): string;
}

interface IUser extends IPerson {
    getName(fill: number): number; // error - сигнатуры метода getName() из IPerson и IUser несовместимы
};
```

```typescript
interface IPerson {
    getName: (value: boolean) => string;
}

interface IUser {
    getName: (value: string) => boolean;
};

type Account = IPerson & IUser;

const account: Account = {
    // ok, метод получает перегрузки из-за переопределение сигнатуры
    getName: (value: boolean | string) => {
        return (typeof value === 'boolean' ? String(value) : Boolean(value)) as boolean & string; // утверждение типа необходимо
    }
}
```

Если мы заранее не знаем имена свойств объекта, можно использовать "индексную сигнатуру":

```typescript
interface IPerson {
    [index: string | number]: string | number;
}

const person: IPerson = {
    firstname: 'John',
    surname: 'Adams',
    age: 34, 
}
```

В описании полей интерфейса можно использовать атрибут `readonly`:

```typescript
interface IPerson {
    readonly name: string;
}

const person: IPerson = {
    name: 'John',
};

person.name = 'adam'; // error - поле name - readonly
```

## Реализация интерфейсов классами

```typescript
interface IPerson {
    name: string;
}

interface IUser {
    login: string;
    toLogin(): boolean;
}

class Account implements IPerson, IUser { // расширение интерфейсов через класс
    constructor(public name: string, public login: string) {}

    toLogin(): boolean {
        return true
    }
}
```

При создании интерфейсов и типов их образ не переносится в JavaScript при транспилировании. А образ класса переносится.

При реализации класса через интерфейс, класс лишь проверяет наличие свойств и методов, указанных в интерфейсе. Но не принимает указанные в интерфейсе типы параметров и позволяет добавлять в классе свои свойства и методы. Но явно менять типы параметров, свойств и возвращаемых значений методов нельзя. Так же все опциональные свойства и методы из интерфейса надо определять в классе явно, иначе они не будут существовать:

```typescript
interface IUser {
    login: string;
    username?: string;
    
    toLogin(credits: string): boolean;
    isLogin(credits: string): boolean;
}

class Account implements IUser {
    constructor(public login: string) {}

    toLogin(credits): boolean { // error - параметр credits имеет неявный тип any
        return Boolean(credits);
    }

    isLogin(credits: boolean): string { // error - неверная сигнатура метода относительно определения в интерфейсе
        return 'a';
    }

    toLogout(): boolean { // ок - новый метод, которого нет в интерфейсе добавить можно
        return true;
    }
}

const account = new Account('john');
account.toLogin('string'); // метод принимает параметр как any
account.login; // ok
account.username; // error - такое поле не существует в классе Account
```

Преимущества реализации классов через абстрактными классами над интерфейсами в том, что абстрактные классы предоставляют модификаторы доступа и конструкторы. А интерфейсы более локаничны.

## Дженерики

Дженерики применимо к функциям позволяют описывать единую логику функции для разных передаваемых типов. Такие функции принято называть: **обобщенными функциями**:

```typescript
// или function merge<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {}
function merge<T>(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
}

merge([true], [false, false]); // [true, false, false]
merge([1, 4, 6], [3, 2]); // [1, 4, 6, 3, 2]
merge([true], [1]); // error - типы элементов массивов (T) должны совпадать
merge<boolean | number>([true], [1]); // ok - [true, 1], мы указали расширенный тип в фигурных скобках для джинерика
```

Можно также пользоваться стрелочным синтаксисом:

```typescript
const merge = <T>(arr1: T[], arr2: T[]): T[] => {
    return [...arr1, ...arr2];
}
```

<T> функции - параметризуется типом "T". Вместо "T" может быть любое другое обозначение типа.
Array<T> - обобщенный массив, джинерик для типа.


## Джинерики (Типы)

```typescript
// string - параметр типа
const names: Array<string> = ['John'];

// джинерик для типа
type CustomType<T> = T;
const n: CustomType<number> = 5;

// джинерик для интерфейса
interface IHasId<T> {
    id: T;
}
const items: Array<IHasId<number>> = [{ id: 0 }, { id: 1 }];

// джинерик для класса
class User<T> {
    constructor(private name: T) {};
}
const user = new User<string>('John');
```

Использование джинерика в объектых типах:

```typescript
type Collection<T> = {
    data: Array<T>;
    forEach(callback: (value: T, index: number, array: Array<T>) => void): void;
    at(index: number): T | undefined;
}

// реализация типа с параметром типа "number"
const collection: Collection<number> = {
    data: [1, 2, 3, 4, 5],
    forEach(callback) {
        this.data.forEach(callback);
    },
    at(index) {
        return this.data.at(index);
    }
}
```

На параметр типа можно наложить ограничения, чтобы передаваемый в дженерик тип реализовал какой-либо интерфейс через ключевое слово `extend`:

```typescript
// сам интерфейс
interface IHasId {
    id: number;
}

// тип, который реализует интерфейс IHasId
type NumberWithId = IHasId & { value: number };

// требуем от параметра типа реализацию через интерфейс IHasID
type Collection<T extends IHasId> = {
    data: Array<T>;
    forEach(callback: (value: T, index: number, array: Array<T>) => void): void;
    at(index: number): T | undefined;
}

// передаём в качестве параметра типа в джинерик тип, реализующий указанный интерфейс IHasId
const collection: Collection<NumberWithId> = {
    data: [{ id: 0, value: 10 }, { id: 1, value: -24 }],
    forEach(callback) {
        this.data.forEach(callback);
    },
    at(index) {
        return this.data.at(index);
    }
}
```

## Джинерики (Функции)

В функциях джинерики избавляют от необходимости перегружать функции (чтобы охватить все типы параметров и возвращаемых значений, требуемые статической типизацией) и реализуют **параметрический полиморфизм**.


Пример использования джинерика в функции (обобщенная функция):
```typescript
function last<T>(coll: T[]): T | undefined {
    return coll.at(-1);
}

console.log(last([1, 2, 3, 4, 5])); // 5
console.log(last([])); // undefined
```

Тоже самое с перегрузкой функции:

```typescript
function last(coll: number[]): number
function last(coll: string[]): string
function last(coll: unknown[]): unknown {
    return coll.at(-1);
}

console.log(last([1, 2, 3, 4, 5])); // 5
console.log(last(['a', 'b', 'c', 'd', 'e'])); // e
console.log(last([])); // undefined
```


## Джинерики с несколькими типами

Использование нескольких типов в джинерике типа:

```typescript
type User<T, U> = {
    id: T;
    name: U;
}

const user: User<number, string> = { id: 0, name: 'John' };
```

Несколько типов в джинерике при определении обобщенной функции:

```typescript
const join = <T, U>(arr1: (T | U)[], arr2: U[]): (T | U)[]  => {
    return [...arr1, ...arr2];
};

join<number, string>([1, 2, 'value'], ['value2', 'value3']); // с явным указанием типов в джинерике
join([1, 2, 'value'], ['value2', 3]); // без указание типов - выведутся автоматически из значений параметров
```

## Асинхронные функции

```typescript
// в Promise используется джинерик с возвращаемым типом
const n = new Promise<number>((resolve) => resolve(1));

// функция возвращает Promise
const wait = (ms: number): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(10), ms));
}

// использование синтаксиса async/await
const getData = async (): Promise<number> => {
    const data = await wait(1000);
    return data;
}
getData().then((result) => console.log(result));
```

## Джинерики в классах

Пример джинерик-класса (обобщенного класса):

```typescript
class ClassA<T, U, V> {
  constructor(private a: T, private b: U, private c: V) {}

  public getProps(): [T, U, V] {
    return [this.a, this.b, this.c];
  }
}
```

Можно наследовать обобщённый класс:

```typescript
class ClassB<T, U> extends ClassA<T, U, never> {
  constructor(a: T, b: U) {
    super(a, b, undefined as never); // приводим параметр к never как отсутствующий
  }
};
```

Обобщенные классы можно использовать как параметры:

```typescript
const fn = (a: ClassB<number, string>): ClassA<number, string, boolean> => {
  return new ClassA<number, string, boolean>(1, 'a', true);
};
```

`Array`, `Map`, `Set`, `Pair` - это встроенные джинерик-классы.

## тип object

Тип пустого объекта (`{}`) принимает все типы кроме `undefined` и `null`:
```typescript
function objToString(obj: {}) {
    obj.prop; // error - тип пустого объекта не позволяет обращаться к произвольным свойствам
    return JSON.stringify(obj);
}
```

Тип `Object` аналогичен `{}`, но предоставляет доступ к методам объектов, например `toString()`:

```typescript
function objToString(obj: Object) {
    obj.prop; // error - тип Object не позволяет обращаться к произвольным свойствам
    return obj.toString();
}
```

Тип `object` (с маленькой буквы) не позволяет передавать в качестве значения ничего кроме объекта/массива (в отличии от `{}` и `Object`):

```typescript
function objToString(obj: object): string {
  return obj.toString();
}

console.log(objToString({ a: 1, b: 'b' }));
console.log(objToString([1, 2, 3]));
console.log(objToString('a')); // error
console.log(objToString(1)); // error
```

## Динамические ключи

Пример использования динамических ключей в объектом типе:

```typescript
type ObjType = {
  [key: string | number | symbol]: unknown;
}

const a: ObjType = {
  color: 'red',
  0: 'value',
  [Symbol('key')]: 1,
};
```

Можно комбинировать динамические ключи с полями указанными явно:

```typescript
type Theme = {
  color: 'red' | 'blue' | 'green';
  sizes: {
    width: number;
    height: number;
    [key: string]: number;
  }
  [key: string]: unknown;
}

const theme = {
  color: 'red',
  sizes: {
    width: 100,
    height: 100,
  },
} satisfies Theme; //
```

Но явно указанные поля должны соответствовать требованиям динамических ключей:

```typescript
type Theme = {
  sizes: { // error - значение свойства должно быть string
    width: number;
    height: number;
  }
  [key: string]: string;
}
```

Динамические ключи можно определять в интерфейсах:

```typescript
interface ITheme {
  color: 'red' | 'green' | 'blue';
  [key: string]: string;
}

const a: ITheme = {
  color: 'red',
  prop: 'value'
}
```

В классах можно определять Index Signature для обычных и статических полей:

```typescript
class Template {
  [field: string]: number;
  static [field: string]: boolean;
}

Template.isActive = true;
const obj = new Template();
obj.prop = 1;
```

В качестве типа динамического ключа может использоваться литерал. Эта техника носит название "Template String Literal":

```typescript
type Listener = {
  [key: `on${string}`]: (name: string) => void;
}

const listener = {
  onClick: (name) => {
    console.log(name);
  },
  onOvermouse: (name) => {
    alert(name);
  }
} satisfies Listener;
```

## Сопоставление типов

Пример использования механизма поиска типов (Lookup Types):

```typescript
interface IPerson {
  name: string;
  age: number;
  location: {
    town: string;
    country: string;
  }
}

// получаем тип поля location из интерфейса IPerson
const personLocation: IPerson['location'] = {
  country: 'Russia',
  town: 'Saint-Petersburg'
};
```

Также можно получать объединение типов:

```typescript
const personData: Person['name' | 'age'] = 1; // number | string
```

C помощью конструкции `keyof Type` или `keyof Interface` можно получить имена всех ключей объектного типа или интерфейса:

```typescript
const personAgePropName: keyof Person = 'age';
```

С помощью `keyof` можно получить объединение типов всех свойств объектного типа или интерфейса:

```typescript
const personData: Person[keyof Person] = 1; // number | string | { town: string, country: string }
```

Пример использования утилит `Pick` и `Omit`:

```typescript
interface IPerson {
  name: string;
  age: number;
  location: {
    town: string;
    country: string;
  }
}

// берем из интерфейса IPerson только поле name
const personName: Pick<Person, 'name'> = {
  name: 'John',
};

// берем все поля интерфейса IPerson кроме name и location
const personAge: Omit<Person, 'name' | 'location'> = {
  age: 34
}
```

Реализация `Pick`:

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]; // in позволяет обойти (итерация) все переданные в K значения типов
}
```

Применение `in` и `keyof` одновременно для создания обобщенного типа, создающего точную копию интерфейса или объектного типа:

```typescript
type TypeCopy<T> = {
    [K in keyof T]: T[K]
}

// ниже объекты с одинаковым типом (набором свойств и типом этих свойств)
const a: Person = { /* ... */ };
const b: TypeCopy<Person> = { /* ... */ };
```

## Записи

Реализация типа с динамической структурой объекта (со статичными типами ключей и значений):

```typescript
type MyRecord<K extends string, V> = {
  [Key in K]: V
};
```

Применение утилиты `Record<Keys, Type>`:

```typescript
type Rating = 1 | 2 | 3 | 4 | 5;
type SongRating = Record<string, Rating>;
const ratings: SongRating = {
    songName: 4
};
```
