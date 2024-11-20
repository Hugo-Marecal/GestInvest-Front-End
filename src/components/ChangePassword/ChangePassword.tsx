import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { sendNewPassword } from '../API/ChangePasswordRequest';

interface UserData {
  currentPassword: string;
  newPassword: string;
  confirmation: string;
}

function ChangePassword() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    currentPassword: '',
    newPassword: '',
    confirmation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newData = await sendNewPassword(userData);
      if (newData) {
        toast.success(newData.message);
        navigate('/account');
      }
    } catch (error) {
      console.error('Erreur envoi des données:', error);
    }
  };

  return (
    <div
      id="account"
      className="flex flex-col h-[84vh] m-auto items-center justify-center w-full p-6 sm:w-5/6 lg:w-3/6"
    >
      <Helmet>
        <title>GestInvest - Modifier votre Mot de Passe</title>
        <meta
          name="description"
          content="Sur la page de modification du mot de passe, vous pouvez modifier votre mot de passe."
        />
      </Helmet>
      <h2 className="text-lg uppercase font-bold p-10 sm:text-xl md:text-2xl xl:text-3xl">
        Modifier votre Mot de Passe
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="currentPassword">
              Mot de passe actuel :
            </label>
          </div>
          <input
            className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="password"
            id="currentPassword"
            name="currentPassword"
            placeholder="*************"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="newPassword">
              Nouveau mot de passe :
            </label>
          </div>
          <input
            className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="*************"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="confirmation">
              Confirmation :
            </label>
          </div>
          <input
            className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="*************"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center gap-10">
          <button
            className="hover:bg-custom-purple border-buttonColor shadow-lg shadow-indigo-500/30 text-center text-sm mt-4 border text-white rounded-full px-3 py-2 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
            type="submit"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
