const user = {
  firstname: "Arthur",
  surname: "Buravljov",
  city: "Petrozavodsk",
  age: 31,
  skills: {
    frontend: true,
    devops: false,
    background: false,
  },
};

const getUserName = (userEntity: { firstname: string, surname: string }): string => {
  return `${userEntity.firstname} ${userEntity.surname}`;
};

const isFrontender = (userEntity: { skills: { frontend: boolean } }): boolean => {
  return userEntity.skills.frontend;
}

console.log(getUserName(user));
console.log('is frontender: ', isFrontender(user));