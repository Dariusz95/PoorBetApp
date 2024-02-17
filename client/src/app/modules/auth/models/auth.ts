export type LoginForm = {
  email: string;
  password: string;
};

export type CreateUserForm = {
  email: string;
  username: string;
  password: string;
};

export type LoginPayloadData = {
  ['access_token']: string;
};
