import {
    apiRequest,
  } from "./api";
  
  import {
    getToken,
    User,
  } from "./authApi";
  
  interface CreateUserResponse {
    message: string;
    user: User;
  }
  
  interface UpdateUserResponse {
    data: User;
  }
  
  export async function listUsers(
    nomeCompleto?: string
  ): Promise<User[]> {
    const token = await getToken();
  
    const query = nomeCompleto
      ? `?nomeCompleto=${encodeURIComponent(
          nomeCompleto
        )}`
      : "";
  
    return apiRequest<User[]>(
      `/user/list${query}`,
      {
        token,
      }
    );
  }
  
  export async function getUserById(
    id: number
  ): Promise<User> {
    const token = await getToken();
  
    return apiRequest<User>(
      `/user/${id}`,
      {
        token,
      }
    );
  }
  
  export async function createUser(
    data: {
      nomeCompleto: string;
      cpf: string;
      telefone: string;
      email: string;
      senha: string;
    }
  ): Promise<User> {
    const response =
      await apiRequest<CreateUserResponse>(
        "/user/create",
        {
          method: "POST",
          body: data,
        }
      );
  
    return response.user;
  }
  
  export async function updateUser(
    id: number,
    data: Partial<{
      nomeCompleto: string;
      cpf: string;
      telefone: string;
      email: string;
      senha: string;
    }>
  ): Promise<User> {
    const token = await getToken();
  
    const response =
      await apiRequest<UpdateUserResponse>(
        `/user/update/${id}`,
        {
          method: "PUT",
          body: data,
          token,
        }
      );
  
    return response.data;
  }
  
  export async function deleteUser(
    id: number
  ): Promise<void> {
    const token = await getToken();
  
    await apiRequest(
      `/user/delete/${id}`,
      {
        method: "DELETE",
        token,
      }
    );
  }