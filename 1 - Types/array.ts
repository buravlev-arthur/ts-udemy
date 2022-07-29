const skills: string[] = ['frontend', 'devops', 'backend', 'qa'];

skills.forEach((skill) => console.log(skill));

const justWebJobs: string = skills
  .filter((skill: string) => skill !== 'devops')
  .map((skills) => `# ${skills}`)
  .reduce((acc, skill) => `${acc}${skill}, `, '');

console.log(justWebJobs.slice(0, justWebJobs.length - 2));