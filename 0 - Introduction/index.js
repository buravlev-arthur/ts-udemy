"use strict";
const addMoney = (sum, user) => {
    user.money = user.money + sum;
    return user;
};
const result = addMoney(1, { name: 'Arthur', money: 2 });
console.log(result);
