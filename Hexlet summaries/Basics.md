## Введение в TypeScript

Установка и базовое использование TypeScript:

```bash
# установка typescript
npm install -D typescript
# компиляция и транспиляция в js-код
npx tsc index.ts
# запуск сгенерированного js-кода
node index.js
```

Установка и базовое использование пакета "ts-node":

```bash
# установка ts-node
npm install -D ts-node
# компиляция и запуск typescript-кода
npx ts-node index.ts
# запуск REPL
npx ts-node
>
```

## Переменные

Автоматические связывание с переменных/констант с типом данных (вывод типов):

```typescript
let age = 10; // age автоматически принимает тип 'number'
age = 'str'; // ошибка - тип string не может быть присвоен 'number'

const arr = [1, 10, 12]; // статическая типизация требует элементы массива одного типа
arr.push('str'); // ошибка - аргумент push() должен быть числов

const obj = {
    name: 'John'
};
obj.age = 32; // ошибка - свойство age не существует в типе { name: string }
```

Явное указние типов переменных редко нужно на практике, потому что вывод типов автоматический:

```typescript
const a: boolean = true;
let b: string = 'str';
```

Тип `null`:

```typescript
let a = 10;
a = null; // ошибка, может быть только типа number

let a: number | null = 10; // число или null (Uniton Type)
a = null; // сработает
```

## Именованные функции

```typescript
/**
 * str - обязательный параметр
 * num - необязательный параметр
 * log - необязательный с предустановленным значением
 */
const fn = (str: string, num?: number, log = true): string => {
    if (log) {
        console.log(str);
    }

    return str.repeat(num ?? 1)
}
```

## Анонимные функции

Если функция определена внутри контекста, выведение типов автоматическое:

```typescript
const arr = ['a', 'b', 'c'];
// анонимная функция (el) => el.toUpperCase() внутри контекста 
const upperArr = arr.map((el) => el.toUpperCase());
```

Вне контекста для анонимных функций нужно выводить типы вручную:

```typescript
const toUpper = (el: string): string => el.toUpperCase();
const upperArr = arr.map(toUpper);
```

## Массивы

Массивы - составной тип данных и контейнер для другого типа (строк, чисел и т.п.).

```typescript
const arr: number[] = [1, 2, 3]; // здесь явное выведение типа number[] не нужно, это для демострации
const getDouble = (arr: number[]): number[] => arr.map((n) => n * 2);
getDouble(arr);
```

## Объекты

```typescript
// { name: string, age: number }
const user {
    name: 'John',
    age: 32
};

user.name = 1; // ошибка, поменять тип свойств нельзя
user.address = '...'; // ошибка, свойство address не существует в объекте user

// вывод типа параметра функции данного объекта
function doSomething(user: { name: string, age: number }) {}

// добавление опциональности свойствам объекта в параметре
// Тогда для параметра user выводится тип: { name: string | undefined, age: number | null }
function doSomething(user: { name?: string, age: number | null }) {}
```

## Перечисления (Enum)

В перечислениях обычно хранят статусы, направления сторон света, дни недели и т.п. Любые постоянные данные срокового типа.

```typescript
enum OrderStatus {
    Created,
    Paid,
    Shiped,
    Delivered
}

const order = {
    id: 0,
    status: OrderStatus.Created // 0
}
```

Enum - это одновременно и тип и js-объект:

```typescript
// используем Enum как тип параметра
function doSomething(status: OrderStatus) {}

// внутри Enum объект:
console.log(OrderStatus);
// {
//   '0': 'Created',
//   '1': 'Paid',
//   '2': 'Shipped',
//   '3': 'Delivered',
//   'Created': 0,
//   'Paid': 1,
//   'Shipped': 2,
//   'Delivered': 3
// }

// поэтому обращаться можно по-разному
console.log(OrderStatus.Paid); // 1
console.log(OrderStatus[1]); // Paid 
```

Можно указать строковые значения:

```typescript
enum OrderStatus {
    Created = '0',
    Paid = '1',
    Shiped = '2',
    Delivered = '3'
}

console.log(OrderStatus); // { Created: '0', Paid: '1', Shiped: '2', Delivered: '3' }
```

## Псевдонимы типов

Псевдонимы (alias) типов (создание типов):

```typescript
// простой тип (положительное число)
type PositiveNumber = number;

// union тип
type PostIndex = number | string | null;

// Тип функция вне объекта (стрелочный синтаксис)
type GetAddress = (postIndex: PostIndex) => string

// составной тип
type User = {
    firstname: string;
    lastname: string;
    age: PositiveNumber;
    postIndex: PostIndex;
    // Тип функция внутри типа, описывающего объект определяется как обычное свойство
    getAddress(postIndex: PostIndex): string;
    // Callback'и внутри типов функция (внутри составных типов) описываются через стрелочный синтаксис
    getFullName(callback: (status: boolean) => void): string; 
}

// Используем тип User
function doSomething(user: User) {}
```

## Тип Any

Any используется, когда не нужна проверка типов или когда TypeScript не может автоматически вывести типы:

```typescript
// в такой массив можно добавлять любые типы данных
const items = [];
items.push(1);
items.push('abcd');

// ошибок при компиляции не будет
let a: any = 5;
a.trim();
a();

// благодаря any внутри объекта можно определять ключи любого типа,
// но обращение к несуществующему типу приведет к ошибке
const obj: any = {};
obj[1] = 'value';
obj['key'] = 12;
```

## Модульность в TypeScript

В TypeScript можно использовать ESM-стиль (export/import), но он будет совместим со средой Node.js:

```typescript
// экпорты
export function getRandomNum(): number {
    return Math.round(Math.random() * 100);
};

export default function(): string {
    return 'default function return';
};
```

```typescript
// импорты
import getDefaultStr from './module.ts';
import { getRandomNum } from './module.ts';
import * as all from './module.ts';

getDefaultStr();
getRandomNum();
all.default();
```

Есть возможность определить Namespaces:

```typescript
// module.ts
export namespace Example {
    export function fn(): string {
        return 'value';
    }
}

// index.ts
import { Example } from './module.ts';

Example.fn();
```

Можно импортировать и экспортировать только типы:

```typescript
// экспорт
export type TypeName = 'a' | 'b';

// импорт
import type { TypeName } from './types.ts';
const a: TypeName = 'a';
```

## Типизация функций

Самый простой способ, использование типа Function:

```typescript
function doSomething(fn: Function) {
    console.log(fn());
}

// сработает, но бесполезно, т.к. не передано число для округления
doSomething(Math.round); 
```

Правильный способ - использования стрелочной функции для типизации:

```typescript
function doSomething(fn: (n: number) => number) {
    fn('str'); // ошибка
    fn(1); // верно
}

doSomething(Math.round);
```

Псевдоним типа функции:

```typescript
type Fn = (n: number) => number

function doSomething(fn: Fn) {
    fn(1);
}
```

## Опциональные параметры

C опциональными параметрами могут возникать ошибки, если мы их используем в теле функции, т.к. кроме указанного типа они так же могут иметь тип undefined:

```typescript
function doSomething(fn: (n: number, index?: number) => number) {};

doSomething((n, i) => n * i); // ошибка, i может быть undefined
```

Чтобы избежать ошибку с `undefined`, все параметры должны быть обязательны, но вызывать функцию можно с меньшим числом параметров:

```typescript
function doSomething(fn: (n: number, index: number) => number) {
    fn(1, 1);
};

doSomething((n, i) => n * i); // верно, определены оба параметра (n, index)
doSomething((n) => n * 2); // тоже верно, хотя определен только первый параметр (n)
```

## Тип Void

Тип возвращаемого значения функции, которая ничего не возвращает - `void`:

```typescript
function toDo() {}
```

Тип Void используется, чтобы не требовать от всех функций (которые ничего не возвращают) возвращать тип undefined.

Void также выступает в качестве оператора JavaScript, который вычисляет выражение и всегда возвращает undefined:

```typescript
const result = void (10 * 4);
```

```typescript
// при определении функции через контекст использования void позволяет возвращать что угодно
const fn: () => void = () => 10;
// вне контекста использования, void запретит возвращать что-то кроме него
function fn(): void {
    return 1; // ошибка
}
```

Можно использовать void в качестве типа аргумента функции, но передаваемый аргумент будет всегда undefined:

```typescript
function fn(a: void) {
    return a;
}

fn(undefined); // другое тип использовать нельзя
```

## Тип never

Тип Never используется, когда функция не сможет никогда ничего вернуть (состояние зацикленности), бросает ошибку или завершает программу:

```typescript
function fn(): never {
    while (true) {}
}

function fn(): never {
    throw new Error();
}

function fn(code = 0): never {
    process.exit(code);
}

// даже если есть возврат, но ts видит, что его тип never, выведение типа функции будет автоматически never
function fn3(code = 0) {
    return process.exit(code);
}
```

## Тип Unknown

Any отключает проверку типов, что опасно. Unknown - это разновидность Any, но Unknown запрещает выполнять любые операции:

```typescript
// тип unknown-переменных нужно затем уточнять  
let a: unknown = 10;
a = a + 5; // ошибка
a(); // ошибка
```

Unknown полезен в качестве типов параметров функций, где параметр может быть любого типа:

```typescript
function isError(data: unknown): boolean {
    return data instanceof Error;
}

isError(1); // false
isError(new Error()); // true
```

## Деструктуризация объектов

Объекты:

```typescript
type User = {
    name: string;
    age: number;
}
function fn({ name, age }: User): string {
    return `${name}, ${age}`;
}

fn({ name: 'John', age: 34 }); // верно
fn({ name: 'John', age: '34' }); // ошибка типа свойства age
```

Массивы:

```typescript
type Point = number[]

function fn([x, y]: Point) {
    return `x: ${x}, y: ${y}`;
}
```

## Rest- и Spread-операторы

```typescript
// Rest-оператор в параметре функци
function getMax(...nums: number[]): number {
    return Math.max(...nums);
};
getMax(1, 5, 6, 9); // 9

// Spread-оператор
function getMax(a: number, b: number): number {
    return Math.max(...nums);
};

// "as const" сообщает компилятору, что массив меняться не будет
// и в нём всегда будет два числа, необходимых для корректной передачи обоих параметров функцию getMax
const nums = [5, 12] as const;

getMax(...nums); // 12
```

## Перегрузка функций

Классический синтаксис перегрузки с типизацией:

```typescript
function concat(a: string, b: string): string;
function concat(a: number, b: number): string;

function concat(a: unknown, b: unknown): string {
    if (typeof a === 'number' && typeof b === 'number') {
        return `${a.toFixed()}${b.toFixed()}`;
    } 
    return `${a}${b}`;
}
```

Синтаксис со стрелочной функцией и псевдонимом типа:

```typescript
type Overload = {
    (a: string, b:string): string;
    (a: number, b:number): string;
}

const concat: Overload = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return `${a.toFixed()}${b.toFixed()}`;
    } 
    return `${a}${b}`;
}
```

Можно описывать и более сложные перегрузки:

```typescript
function toSum(a: number, b: number, c: number): number;
function toSum(a: string, b: string, c: string): string;
function toSum(a: number, b: number): number;
function toSum(a: string, b: string): string;

function toSum(a: unknown, b: unknown, c?: unknown): unknown {
    if (typeof a === 'string' && typeof b === 'string' && c === undefined) {
        return `${a}${b}`;
    }
    if (typeof a === 'number' && typeof b === 'number' && c === undefined) {
        return a + b;
    }
    if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number') {
        return a + b + c;
    }
    if (typeof a === 'string' && typeof b === 'string' && typeof c === 'string') {
        return `${a}${b}${c}`
    }
}

toSum(3, 5, 10)
toSum('a', 'b', 'c')
toSum(3, 5)
toSum('a', 'b')
```

Но вместо перегрузки лучше использовать Union Type и Generics.


## Cужение типа (Type Narrowing)

```typescript
function checkType(data: unknown): string {
    if (typeof data === 'string') { // сужение типа
        return 'It is string';
    }
    if (data instanceof Object) { // cужение типа
        return 'It is object';
    }
};
```

Принцип работы: комплиятор выполняет проверку условий (типов) до запуска и считает, что внутри тела условия тип значений совпадает с тем, что было в проверке.

Сужение работает с Union Type:

```typescript
function checkType(data: string | number): string {
    if (typeof data === 'string') { // сужение типа
        // ...
    }
};
```

Работает также с оператором `switch`:

```typescript
function checkType(data: string | number): string {
    switch (typeof data) {
        case 'number':
            return 'number'
        case 'string':
            return 'string'
    }
};
```

## Аннотации типов

Составные типы массивов:

```typescript
type User = {
    name: string;
    age: number;
}
// в круглых скобках составной тип
const users: (string | null | { name: string } | User)[] = [];
const points: ({ x: number, y: number })[] = [];
```

Определение типа массивов через generic:

```typescript
const arr: Array<{ num: number }> = [];
const users: Array<User> = [];
const letters: Array<string> = [];
```

Пустой массив без явного указания типа выводит автоматически тип `any[]` и в него можно помещать что угодно:

```typescript
const arr = []; // any[]
arr.push(['yet', 'one', 'array']);
arr.push(true);
arr[10] = 1;
```

## Многомерные массивы

```typescript
const arr = [[1, 2], [3, 4]]; // number[][]

const users: ({ name: string })[][] = [
    [{ name : 'John'}, { name: 'Lucy' }],
    [{ name : 'Adam'}]
];

const values: (string | number)[][] = [[1, 'abcd'], ['efgh', 2]];

// с синтаксисом дженериков
const points: Array<Array<number>> = [[1, 2, 3], [4, 5, 6]];

// массивы могут быть частью объектов, а объекты - элементами массивов внутри других объектов
type Theme = {
    name: string;
    order: number;
}
type Lesson = {
    name: string;
    time: number;
    themes: Theme[];
}
```

## Неизменяемые массивы

Мутировать массивы - плохой тон. Вместо этого с помощью `map`, `reduce` и `filter` создаются новые массивы. На уровне TypeScript запретить мутацию массива можно с помощью специального типа `readonly`:

```typescript
function processArr(numbers: readonly number[]): number[] {
    numbers.push(1); // ошибка (push отсутствует в типе readonly number[])
    return numbers; // ошибка (return не может вернуть мутированный массив)
}
```

Но `readonly` не запрещает менять объекты внутри массива:

```typescript
const arr: readonly ({ name: string })[] = [{ name: 'John' }];
arr[0].name = 'Adam'; // сработает
```

`readonly` - это синтаксический сахар дженерика `ReadonlyArray`:

```typescript
const arr: ReadonlyArray<string> = ['John'];
```

## Кортежи

```typescript
const point: [number, number] = [1, 2];
point.push(3); // сработает, но так делать не надо
ResponseError.pop() // тоже работает для совместимости, но некорректно

// с необязательным параметром (необязательные должны быть в конце)
const point: [number, number?] = [1];
point[1] = 2;

// с разными типами элементов
const ResponseError: [number, string] = [404, 'Not found'];
```

## Типы как множества

Тип данных - множество операций и набор допустимых действий над ними.

Типы данных с одной стороны ограничивают набор значений (сверху и снизу), с другой стороны представляют множества. Поэтому типы можно объединять (`number | string`), пересекать, расширять и т.д.

## Null и Undefined

В TypeScript `null` и `undefined` это два типа с одним значением. Проверка на null в TypeScript уже включена:

```typescript
function upper(str: string | null): string {
    return str.toUpperCase(); // ошибка: str возможно null
};
```

Избежать данную ошибку можно при помощи оператора `.?` отсечения типов (Differentiating Types):

```typescript
function upper(str?: string | null): string {
    if (str !== null && str !== undefined) {
        return str.toUpperCase();
    }
    return '';
};
```

Или так:

```typescript
function upper(str?: string | null): string {
    return str?.toUpperCase() ?? '';
};
```

## Литералы

Литералы - ограниченный набор доступных значений. В TypeScript литералы работают со следующими типами: string, number, boolean, BigInt.

```typescript
// множества с одним элементом
type Text = 'text';
type One = 1;

// множество из нескольких элементов (объединение типов)
type Names = 'Adam' | 'John' | 'Alex' | 'Michael';

// можно комбинировать с любыми базовыми типами
type FailResult = string | false;

// литералы в свойствах объектов
type DbConfig = {
    type: 'mysql' | 'postgre' | 'mongodb' | 'redis',
    host: string,
    port: string,
}
```

Строковые перечисления реализуют Enums. Минус Enums - они остаются в коде после транспиляции:

```typescript
enum Status {
    Created = 'created',
    Paid = 'paid',
    Shipped = 'shipped',
    Delivered = 'delivered'
};
```

Приведение объекта или массива к литеральному типу:

```typescript
// каждое свойство объекта получает тип readonly
const dbConfig = {
    host: 'https://0.0.0.0',
    port: 3306,
    type: 'mysql'
} as const;

dbConfig.host = 'https://127.0.0.1'; // ошибка

// массив names получает тип readonly
const names = ['Adam', 'John', 'Elizabeth'] as const;
names.push('Alex'); // ошибка 
```

## Пересечения

Для пересечения типов (разница множеств, выведение значений, доступных в обоих типах) используется оператор `&`:

```typescript
type TypeA = {
    prop1: string;
}
type TypeB = TypeA & {
    prop2: number;
}

// оба свойства оказались в типе TypeB
const obj: TypeB = { prop1: 'str', prop2: 1 };

// выведется тип never - общих допустимых значений у строк и числе нет
type StringAndNumber = string & number;
```

## Иерархия типов

В тип `string` входят все строчные объединения литералов, в тип `number` - все литералы чисел:

```typescript
type NumberUnion = 1 | -1 | 0; // NumberUniton - подтип number
const a: NumberUnion = 1;
const b: number = a; // number - супертип
```

Тип `unknown` - надмножество всех множеств типов TypeScript. Между `unknown` и `any` есть разница:

```typescript
// any позволит выполнить такую операцию
const a: any = 0;
a.prop = 1;

const a: unknown = 0;
a.prop = 1; // а здесь ошибка - unknown потребует выполнить проверку типа
```

Тип `never` позволяет не присваивать и не допускать присваивание переменной/константе значения:

```typescript
let neverVar: never;
neverVar = 1; // ошибка - тип number не совместим с never
```

Восходящее (от подтипа к базовому типу) и низходящее присваивание (от базового типа к подтипу):

```typescript
let one: number = 1; // Неявное восходящее присваивание (1 -> number)
let two = one as 2; // Низходящее присваивание (number -> 2);
```

Приведение базового типа к подтпипу делается при помощи служебного слова `as`:

## Структурная типизация

В JavaScript используется "утиная типизация": если разные объекты имеют ожидаемые свойства/методы, то их можно использовать как объект одно типа. В Java нужно нужно определять интерфейс, имплементировать его для классов, а переменные/параметры, которым присваиваются эти объекты, должны иметь в качестве типа данный интерфейс.

Можно реализовать передачу разных объектов в параметр функции через перегрузку этой функции - номинативная типизация.

В TypeScript используется структурная типизация:

```typescript
const moderator = {
    login: 'moderator',
    type: 'moderator',
    telphone: '+39045843234'
}

const admin = {
    login: 'admin',
    email: 'admin@test.com',
    type: 'admin',
    firstname: 'John',
    lastname: 'Adams'
}

function showUserData(data: { login: string, email: string }): string {
    return `login: ${data.login}, email: ${data.email}`;
}

showUserData(moderator); // сработает
showUserData(admin); // сработает
```

Расширение (`|`) и сужение (`&`) типа:

```typescript
// Сужение множества
type TypeA = {
    prop1: number;
    prop2: string;
} & {
    prop3: boolean;
}

const a: TypeA = { prop1: 1, prop2: '', prop3: true } // ок - есть все свойства
const b: TypeA = { prop3: true } // ошибка - недостаёт prop1 и prop2
const c: TypeA = { prop1: 1, prop2: '' } // ошибка - недостаёт prop3

// Расширение множества
type TypeB = {
    prop1: number;
    prop2: string;
} | {
    prop3: boolean;
}

const d: TypeB = { prop3: true } // ok
const e: TypeB = { prop1: 1, prop2: '' } // ok
const f: TypeB = { prop1: 1, prop2: '', prop3: true } // ok
```

Поля с одинаковыми именами но разными типами при пересечении (`&`) выводят тип `never`. При объединении (`|`) позволяют выбрать любой тип:

```typescript
// пересечение
type TypeA = {
    prop: boolean
} & {
    prop: string
}

const a1: TypeA = { prop: true } // ошибка, prop имеет тип never
const a2: TypeA = { prop: '' } // ошибка, prop имеет тип never

// объединение
type TypeA = {
    prop: boolean
} / {
    prop: string
}

const a1: TypeA = { prop: true } // ok
const a2: TypeA = { prop: '' } // ok
```

## Ковариантность и контравариантность

В примере ниже, у функции, которая должна вернуть объединение литерал (-1, 0, 1) возвращаемый результат имеет тип `number`: `Math.sign(item1 - item2)`. Множество `number` шире, чем множество `-1 | 0 | 1`. Процесс восходящего присваивания (`number` -> `-1 | 0 | 1`) не сработает: возвращаемое значение должно быть такое же или уже (это **ковариантность**).

```typescript
type ComparatorCallback = (item1: number, item2: number, index: number) => -1 | 0 | 1;
// с помощью declare описываем только типы функции
declare function sort(arr: Array<number>, callback: ComparatorCallback): Array<number>;
const arr = [1, 16, -3, 24, 10];
// ошибка - number не может быть присвоен литералу -1 | 0 | 1
const comparator: ComparatorCallback = (item1, item2) => Math.sign(item1 - item2); 
sort(arr, comparator);
```

Можно переписать функцию comparator:

```typescript
const comparator: ComparatorCallback = (item1, item2) => {
    if (item1 === item2) {
        return 0;
    }
    return item1 > item2 ? 1 : 0;
};
```

Множество значений параметров может быть шире определенного, а возвращаемое значение может быть уже:

```typescript
type Formatter = (val: string) => string;

// множество значений параметра расширено, а возвращаемый результат сужен до символьного литерала
const formatToConcrete: Formatter  = (val: string | number): 'a' => 'a';
// две ошибки: тип параметра уже определенного, тип возвращаемого результата шире определенного
const formatToConcrete: Formatter  = (val: 'a'): string | number => val;
```
