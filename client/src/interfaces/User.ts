export interface User {
  id: number;
  username: string;
}

export interface UserWithToken {
  token: string;
  user: User;
}
