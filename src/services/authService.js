import { authClient } from '../http/authClient.js';

function register({ userName, email, password }) {
  return authClient.post('/registration', { name: userName, email, password });
}

function sendActivation(email) {
  return authClient.post('/activation/resend', { email });
}

function login({ email, password }) {
  return authClient.post('/login', { email, password });
}

function resetPassword(email) {
  return authClient.post('/reset-password', { email });
}

function saveNewPassword({ password, confirmPassword, resetToken }) {
  return authClient.post(`/reset-password/${resetToken}`, {
    password,
    confirmPassword,
  });
}

function changeName({ id, newName }) {
  return authClient.patch('/change-name', { id, newName });
}

function changeEmail({ id, email, password, newEmail }) {
  return authClient.patch('/change-email', { id, email, password, newEmail });
}

function saveNewEmail(confirmNewEmailToken) {
  return authClient.get(`/change-email/${confirmNewEmailToken}`);
}

function changePassword({ id, password, newPassword, confirmNewPassword }) {
  return authClient.patch('/change-password', {
    id,
    password,
    newPassword,
    confirmNewPassword,
  });
}

function logout() {
  return authClient.post('/logout');
}

function activate(activationToken) {
  return authClient.get(`/activation/${activationToken}`);
}

function refresh() {
  return authClient.get('/refresh');
}

export const authService = {
  register,
  sendActivation,
  login,
  resetPassword,
  saveNewPassword,
  changeName,
  changeEmail,
  saveNewEmail,
  changePassword,
  logout,
  activate,
  refresh,
};
