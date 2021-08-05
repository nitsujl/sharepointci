import { graph, IUser } from "@pnp/graph/presets/all";
import "@pnp/graph/users";

export async function getCurrentUser(): Promise<IUser> {
  return await graph.me();
}

export async function getAllUsers(): Promise<IUser[]> {
  return await graph.users();
}
