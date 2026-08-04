import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  name: string;
  cpf: string;
  telefone: string;
  email: string;
  password: string;
}

const USERS_KEY = "@reclama_sl_users";
const LOGGED_USER_KEY = "@reclama_sl_logged_user";
const TERMS_KEY = "@reclama_sl_terms_accepted";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

export async function getUsers(): Promise<User[]> {
  try {
    const savedUsers = await AsyncStorage.getItem(USERS_KEY);

    if (!savedUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(savedUsers);

    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch (error) {
    console.log("Erro ao buscar usuários:", error);
    return [];
  }
}

export async function setLoggedUser(user: User): Promise<void> {
  await AsyncStorage.setItem(
    LOGGED_USER_KEY,
    JSON.stringify(user)
  );
}

export async function registerUser(user: User): Promise<User> {
  const users = await getUsers();

  const normalizedUser: User = {
    ...user,
    name: user.name.trim(),
    cpf: onlyNumbers(user.cpf),
    telefone: onlyNumbers(user.telefone),
    email: normalizeEmail(user.email),
  };

  const alreadyExists = users.some((savedUser) => {
    return (
      normalizeEmail(savedUser.email) === normalizedUser.email ||
      onlyNumbers(savedUser.cpf) === normalizedUser.cpf ||
      onlyNumbers(savedUser.telefone) === normalizedUser.telefone
    );
  });

  if (alreadyExists) {
    throw new Error(
      "Já existe uma conta com esse e-mail, CPF ou telefone."
    );
  }

  const updatedUsers = [...users, normalizedUser];

  await AsyncStorage.setItem(
    USERS_KEY,
    JSON.stringify(updatedUsers)
  );

  // Login automático após o cadastro.
  await setLoggedUser(normalizedUser);

  return normalizedUser;
}

export async function loginUser(
  login: string,
  password: string
): Promise<User | null> {
  const users = await getUsers();

  const normalizedText = normalizeEmail(login);
  const normalizedNumbers = onlyNumbers(login);

  const user = users.find((savedUser) => {
    const loginMatches =
      normalizeEmail(savedUser.email) === normalizedText ||
      onlyNumbers(savedUser.cpf) === normalizedNumbers ||
      onlyNumbers(savedUser.telefone) === normalizedNumbers;

    return loginMatches && savedUser.password === password;
  });

  if (!user) {
    return null;
  }

  // Mantém o usuário conectado.
  await setLoggedUser(user);

  return user;
}

export async function getLoggedUser(): Promise<User | null> {
  try {
    const savedUser =
      await AsyncStorage.getItem(LOGGED_USER_KEY);

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as User;
  } catch (error) {
    console.log("Erro ao carregar sessão:", error);
    return null;
  }
}

export async function isLogged(): Promise<boolean> {
  const user = await getLoggedUser();

  return user !== null;
}

export async function logoutUser(): Promise<void> {
  await AsyncStorage.removeItem(LOGGED_USER_KEY);
}

export async function acceptTerms(): Promise<void> {
  await AsyncStorage.setItem(TERMS_KEY, "true");
}

export async function hasAcceptedTerms(): Promise<boolean> {
  const accepted = await AsyncStorage.getItem(TERMS_KEY);

  return accepted === "true";
}