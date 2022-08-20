const getEx1 = () => {
  class User {
    skills: string[];

    constructor() {
      this.skills = [];
    }

    addSkill(skill: string): void;
    addSkill(skill: string[]): void;
    addSkill(skill: string | string[]): void {
      if (typeof skill === 'string') {
        this.skills.push(skill);
      } else {
        this.skills = [...this.skills, ...skill];
      }
    }
  }

  const user = new User();
  user.addSkill('first');
  user.addSkill(['second', 'third']);
  console.log(user);

  // usuall functions
  function run(): void;
  function run(distance: number): number;
  function run (distance: string): string;
  function run (distance?: number | string): void | number | string {
    if (typeof distance == 'number' || typeof distance == 'string') {
      return distance;
    } else {
      console.log('Значение на задано');
    }
  }

  run();
  run(10);
  run('10');
}

getEx1();