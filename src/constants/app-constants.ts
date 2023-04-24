export const REGEX_PATTERN =
  '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]{2,})[A-Za-z\\d@$!%*#?&]{8,}$';

export const AUTH_STORAGE = {
  username: 'auth-username',
  email: 'auth-email',
  token: 'auth-token',
  image: 'auth-image',
};

export const USERNAME = {
  minLength: 5,
  maxLength: 15,
};

export const PASSWORD = {
  minLength: 8,
  maxLength: 100,
};
