import { expect, test, describe, mock } from "bun:test";
import { NeonToolkit } from "../src/index";
import { createApiClient } from "@neondatabase/api-client";
import { neon } from "@neondatabase/serverless";

// Mock the external dependencies
mock.module("@neondatabase/api-client", () => ({
  createApiClient: mock(() => ({
    createProject: mock(async () => ({
      data: {
        project: { id: "test-project-id" },
        connection_uris: [{ connection_uri: "postgres://test" }],
        roles: [],
        databases: [],
        operations: [],
        branch: {},
        endpoints: []
      }
    })),
    deleteProject: mock(async () => {})
  }))
}));

mock.module("@neondatabase/serverless", () => ({
  neon: mock(() => mock(async () => {
    return [{ result: 1 }];
  }))
}));

describe("NeonToolkit", () => {
  test("creates a new instance with API key", () => {
    const toolkit = new NeonToolkit("test-api-key");
    expect(toolkit).toBeDefined();
    expect(toolkit.apiClient).toBeDefined();
  });

  test("creates a project with default options", async () => {
    const toolkit = new NeonToolkit("test-api-key");
    const project = await toolkit.createProject();
    
    expect(project).toBeDefined();
    expect(project.project.id).toBe("test-project-id");
    expect(project.connectionURIs[0].connection_uri).toBe("postgres://test");
  });

  test("creates a project with custom options", async () => {
    const toolkit = new NeonToolkit("test-api-key");
    const project = await toolkit.createProject({
      name: "custom-project"
    });
    
    expect(project).toBeDefined();
    expect(project.project.id).toBe("test-project-id");
  });

  test("deletes a project", async () => {
    const toolkit = new NeonToolkit("test-api-key");
    const project = await toolkit.createProject();
    await toolkit.deleteProject(project);
    // If we get here, no error was thrown
    expect(true).toBe(true);
  });

  test("executes SQL query", async () => {
    const toolkit = new NeonToolkit("test-api-key");
    const project = await toolkit.createProject();
    const result = await toolkit.sql(project, "SELECT 1");
    
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual({ result: 1 });
  });
}); 