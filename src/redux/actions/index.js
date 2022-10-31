export const USER_EMAIL = 'USER_EMAIL';

export const userEmail = (charsEmail) => ({
  type: USER_EMAIL,
  payload: charsEmail,
});
