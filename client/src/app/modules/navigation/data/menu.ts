export type MenuItem = {
  name: string;
  url: string;
  icon: string;
};

export const menu = [
  // {
  //   name: 'Logowanie',
  //   url: 'auth/sign-in',
  //   icon: 'login',
  // },
  // {
  //   name: 'Rejestracja',
  //   url: 'auth/sign-up',
  //   icon: 'how_to_reg',
  // },
  {
    name: 'Bet',
    url: '/',
    icon: 'dashboard',
  },
];

export const notAuthenticatedUserMenu = [
  {
    name: 'Logowanie',
    url: 'auth/sign-in',
    icon: 'login',
  },
  {
    name: 'Rejestracja',
    url: 'auth/sign-up',
    icon: 'how_to_reg',
  },
];
export const authenticatedUserMenu = [
  {
    name: 'Bet',
    url: 'app/bet',
    icon: 'dashboard',
  },
];
