/* @internal */ // этот интерфейс не будет включен в декларацию
interface User {
  name: string;
  money: number;
}

const addMoney = (sum: number, user: User): User => {
  user.money = user.money + sum;
  return user;
};

const result = addMoney(1, { name: 'Arthur', money: 2 });
console.log(result);