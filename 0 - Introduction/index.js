var addMoney = function (sum, user) {
    user.money = user.money + sum;
    return user;
};
var result = addMoney(1, { name: 'Arthur', money: 2 });
console.log(result);
