export interface User {
  username?: string;
  email?: string;
  token?: string;
  password?: string;
  bio?: string;
  image?: string;
}

export interface LoggedUser {
  [key: string]: {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
  };
}
