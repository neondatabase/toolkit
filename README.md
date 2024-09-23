# @neondatabase/toolkit

This is a toolkit that Bundles Neon's [API Client](https://www.npmjs.com/package/@neondatabase/api-client) as well as Neon's [Serverless Driver](https://github.com/neondatabase/serverless).

You can use it to simplify the process of creating a Neon project and running SQL queries. This is ideal for test environments, where you don't want to set up a Neon project manually.

Furthermore, it's also a great choice for AI agents which need to interact with Neon.

> [!CAUTION]
> This is in very early development and API stability is not guaranteed.

```typescript
import { NeonToolkit } from "@neondatabase/toolkit";

const toolkit = new NeonToolkit(process.env.NEON_API_KEY!);
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
```

To run this:

```bash
NEON_API_KEY=<YOUR_NEON_API_KEY> node index.js # bun also works
```

### Accessing the API Client

```typescript
import { NeonToolkit } from "@neondatabase/toolkit";

const toolkit = new NeonToolkit(process.env.NEON_API_KEY!);

const project = await toolkit.createProject();

const apiClient = toolkit.apiClient;

// Now, you have the underlying API client which lets you interact with Neon's API.
```

## Security

Neon adheres to the [securitytxt.org](https://securitytxt.org/) standard for transparent and efficient security reporting. For details on how to report potential vulnerabilities, please visit our [Security reporting](https://neon.tech/docs/security/security-reporting) page or refer to our [security.txt](https://neon.tech/security.txt) file.

If you have any questions about our security protocols or would like a deeper dive into any aspect, our team is here to help. You can reach us at [security@neon.tech](security@neon.tech).
