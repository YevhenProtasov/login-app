import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService.js';
import { authService } from '../services/authService.js';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isChecked, setChecked] = useState(false);

  async function sendActivation(email) {
    const message = await authService.sendActivation(email);

    return message;
  }

  async function activate(activationToken) {
    const { accessToken, user } = await authService.activate(activationToken);

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function checkAuth() {
    try {
      const { accessToken, user } = await authService.refresh();

      accessTokenService.save(accessToken);
      setUser(user);
    } catch (error) {
      console.log('User is not authentincated');
    } finally {
      setChecked(true);
    }
  }

  async function login({ email, password }) {
    const { accessToken, user } = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function resetPassword(email) {
    await authService.resetPassword(email);
  }

  async function saveNewPassword({ resetToken, password, confirmPassword }) {
    await authService.saveNewPassword({
      resetToken,
      password,
      confirmPassword,
    });
  }

  async function changeName({ id, newName }) {
    console.log('change name context func');
    const { user } = await authService.changeName({ id, newName });

    console.log({ user });

    setUser(user);
  }

  async function changeEmail({ id, email, password, newEmail }) {
    await authService.changeEmail({ id, email, password, newEmail });
  }

  async function saveNewEmail(confirmNewEmailToken) {
    const { accessToken, user } = await authService.saveNewEmail(
      confirmNewEmailToken
    );

    accessTokenService.save(accessToken);
    setUser(user);
  }

  async function changePassword({
    id,
    password,
    newPassword,
    confirmNewPassword,
  }) {
    await authService.changePassword({
      id,
      password,
      newPassword,
      confirmNewPassword,
    });
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isChecked,
      user,
      setUser,
      checkAuth,
      sendActivation,
      activate,
      login,
      resetPassword,
      saveNewPassword,
      changeName,
      changeEmail,
      saveNewEmail,
      changePassword,
      logout,
    }),
    [user, isChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
