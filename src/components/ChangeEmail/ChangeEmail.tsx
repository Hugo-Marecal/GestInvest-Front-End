import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import sendNewEmail from '../API/ChangeEmailRequest';

function ChangeEmail() {
  const [newEmail, setNewEmail] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newData = await sendNewEmail(newEmail);
      if (newData) {
        toast.success(newData.message);
        setNewEmail('');
      }
    } catch (error) {
      console.error('Erreur envoi des données:', error);
    }
  };

  return (
    <div className="flex flex-col h-[84vh] m-auto items-center justify-center w-full p-6 sm:w-5/6 lg:w-3/6">
      <Helmet>
        <title>GestInvest - Modifier votre Email</title>
        <meta
          name="description"
          content="Sur la page de modification d'email, vous pouvez modifier votre adresse mail."
        />
      </Helmet>
      <h2 className="text-lg uppercase font-bold p-10 sm:text-xl md:text-2xl xl:text-3xl">Modifier votre Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="email">
              E-mail :
            </label>
          </div>
          <input
            className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="email"
            id="email"
            name="email"
            placeholder="Votre nouvelle adresse mail"
            value={newEmail}
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
export default ChangeEmail;
