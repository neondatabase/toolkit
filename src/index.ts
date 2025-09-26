import {
  Api,
  createApiClient,
  type BranchResponse,
  type ConnectionURIsResponse,
  type DatabasesResponse,
  type EndpointsResponse,
  type OperationsResponse,
  type ProjectCreateRequest,
  type ProjectResponse,
  type RolesResponse,
} from "@neondatabase/api-client";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type ToolkitProject = {
  project: ProjectResponse["project"];
  connectionURIs: ConnectionURIsResponse["connection_uris"];
  roles: RolesResponse["roles"];
  databases: DatabasesResponse["databases"];
  operations: OperationsResponse["operations"];
  branches: BranchResponse["branch"];
  endpoints: EndpointsResponse["endpoints"];
};

export class NeonToolkit {
  apiClient: Api<unknown>;

  constructor(apiKey: string) {
    this.apiClient = createApiClient({ apiKey });
  }

  async createProject(
    projectOptions?: ProjectCreateRequest["project"],
  ): Promise<ToolkitProject> {
    const { data } = await this.apiClient.createProject({
      project: projectOptions || {},
    });

    return {
      project: data.project,
      connectionURIs: data.connection_uris,
      roles: data.roles,
      databases: data.databases,
      operations: data.operations,
      branches: data.branch,
      endpoints: data.endpoints,
    };
  }

  async deleteProject(project: ToolkitProject) {
    await this.apiClient.deleteProject(project.project.id);
  }

  async sql(
    project: ToolkitProject,
    query: string,
  ): Promise<ReturnType<NeonQueryFunction<boolean, boolean>>> {
    return neon(project.connectionURIs[0].connection_uri).query(query);
  }
}
