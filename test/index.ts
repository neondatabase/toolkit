import { NeonToolkit } from "../";

const toolkit = new NeonToolkit(process.env.API_KEY!);
const project = await toolkit.createProject();

await toolkit.sql(
  project,
  `
    CREATE TABLE IF NOT EXISTS
        users (
            id UUID PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
`,
);

await toolkit.sql(
  project,
  `
    INSERT INTO users (id, name) VALUES (gen_random_uuid(), 'Sam Smith');
`,
);

console.log(
  await toolkit.sql(
    project,
    `
    SELECT name FROM users;
`,
  ),
);

await toolkit.deleteProject(project);
