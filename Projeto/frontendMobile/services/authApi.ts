import AsyncStorage from
  "@react-native-async-storage/async-storage";

import {
  apiRequest,
} from "./api";

export interface User {
  id: number;
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  funcao: "admin" | "usuario";
  dataCadastro?: string;
}

interface RegisterResponse {
  message: string;
  user: User;
}

interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

const USER_KEY =
  "@reclama_sl_logged_user";

const TOKEN_KEY =
  "@reclama_sl_token";

export async function registerUser(
  data: {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
  }
): Promise<User> {
  const response =
    await apiRequest<RegisterResponse>(
      "/user/create",
      {
        method: "POST",
        body: data,
      }
    );

  /*
   * O endpoint de cadastro não
   * retorna token atualmente.
   *
   * Por isso fazemos login logo
   * depois do cadastro.
   */
  await loginUser(
    data.email,
    data.senha
  );

  return response.user;
}

export async function loginUser(
  email: string,
  senha: string
): Promise<User> {
  const response =
    await apiRequest<LoginResponse>(
      "/auth/login",
      {
        method: "POST",
        body: {
          email: email
            .trim()
            .toLowerCase(),
          senha,
        },
      }
    );

  await AsyncStorage.multiSet([
    [
      USER_KEY,
      JSON.stringify(
        response.user
      ),
    ],
    [
      TOKEN_KEY,
      response.token,
    ],
  ]);

  return response.user;
}

export async function getLoggedUser():
  Promise<User | null> {
  const savedUser =
    await AsyncStorage.getItem(
      USER_KEY
    );

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(
      savedUser
    ) as User;
  } catch {
    return null;
  }
}

export async function getToken():
  Promise<string | null> {
  return AsyncStorage.getItem(
    TOKEN_KEY
  );
}

export async function isLogged():
  Promise<boolean> {
  const [user, token] =
    await AsyncStorage.multiGet([
      USER_KEY,
      TOKEN_KEY,
    ]);

  return Boolean(
    user[1] && token[1]
  );
}

export async function logoutUser() {
  await AsyncStorage.multiRemove([
    USER_KEY,
    TOKEN_KEY,
  ]);
}