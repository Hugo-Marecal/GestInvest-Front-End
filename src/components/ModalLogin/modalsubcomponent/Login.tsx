import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../API/authentificationRequest';

interface LoginFormProps {
  closeModal: () => void;
}

const Login = ({ closeModal }: LoginFormProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(loginEmail, inputPassword);
      setTimeout(() => {
        closeModal();
        window.location.href = '/Dashboard';
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erreur lors de la connexion:', error);
      }
    }
  };

  return (
    <form onSubmit={handleLoginSubmit} className="login">
      <div className="flex flex-col justify-center items-center py-4 ">
        <label className="pt-2 pb-2 text-white w-full text-start" htmlFor="login-email">
          E-mail
        </label>
        <input
          className="rounded-md p-1 w-full bg-violet-300 focus:outline-none focus:ring-2 focus:ring-buttonColor placeholder-gray-900 placeholder-opacity-60"
          type="email"
          id="login-email"
          name="login-email"
          placeholder="js4Life@gmail.com"
          required
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label className="pt-4 pb-2 text-white w-full text-start" htmlFor="login-password">
          Mot de passe
        </label>
        <input
          className="rounded-md p-1 w-full bg-violet-300 focus:outline-none focus:ring-2 focus:ring-buttonColor placeholder-gray-900 placeholder-opacity-60"
          type="password"
          id="login-password"
          name="login-password"
          placeholder="*********"
          required
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <Link
          to="/forgot-password"
          className="pt-4 pb-2 text-gray-400 hover:text-buttonColor hover:underline text-xs w-full"
          onClick={closeModal}
        >
          Mot de passe oublié ?
        </Link>
        <button
          className="w-2/4 valid-button p-2 mt-4 hover:bg-custom-purple text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
          type="submit"
        >
          Se connecter
        </button>
      </div>
    </form>
  );
};

export default Login;
