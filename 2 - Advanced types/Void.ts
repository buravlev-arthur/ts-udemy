const getVoid = () => {
  const logIn = (id: string | number): void => {
    console.log(id);
  }

  const a = logIn(1); // a - void

  type voidFunc = () => void;

  const trueF: voidFunc = () => {
    return true;
  }

  const b = trueF(); // b - void (return will be ignored for void type funcs)

  const user = {
    s: ['s'],
  };

  const skills: string[] = ['devops', 'dev', 'frontend', 'backend'];

  skills.forEach((skill) => user.s.push(skill));

  console.log(user);
}

getVoid();