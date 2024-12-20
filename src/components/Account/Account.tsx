import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { GetAccountInfo, sendNewAccountInfo } from '../API/accountRequest';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';

interface UserData {
  email: string;
  last_name: string;
  first_name: string;
}

function Account() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    last_name: '',
    first_name: '',
  });

  const closeDeleteAccountModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const data = await GetAccountInfo();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccountInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);

    try {
      const newData = await sendNewAccountInfo(userData);
      if (newData) {
        toast.success('Mise a jour reussi', {
          autoClose: 2800,
          pauseOnHover: false,
        });
        setTimeout(() => {
          navigate(0);
        }, 3000);
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
        <title>GestInvest - Gestion du profil</title>
        <meta
          name="description"
          content="Sur la page de gestion du profil, vous pouvez gérer vos informations personnelles, vos paramètres et vos préférences."
        />
      </Helmet>
      <h2 className="text-lg uppercase font-bold p-10 sm:text-xl md:text-2xl xl:text-3xl">Gestion du profil</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label className="py-4 pl-2 sm:p-4 text-xs md:text-sm font-bold" htmlFor="first_name">
              Prénom :
            </label>
          </div>
          <input
            className=" pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="text"
            id="first_name"
            name="first_name"
            required
            placeholder={userData.first_name ? userData.first_name : 'prénom'}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="last_name">
              Nom :
            </label>
          </div>
          <input
            className=" pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="text"
            id="last_name"
            name="last_name"
            required
            placeholder={userData.last_name ? userData.last_name : 'nom'}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="email">
              E-mail :
            </label>
          </div>
          <div className="flex w-full items-center">
            <input
              className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
              type="email"
              id="email"
              name="email"
              placeholder={userData.email}
              disabled
            />
            <Link
              to="/change-email"
              className="h-full w-24 text-white border-l border-buttonColor hover:bg-buttonColor rounded-r-lg flex items-center justify-center"
            >
              Modifier
            </Link>
          </div>
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5 ">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="password">
              Mot de passe :
            </label>
          </div>

          <div className="flex w-full items-center">
            <input
              className="pl-2 bg-transparent w-full rounded-r-lg sm:pl-4 h-full"
              type="password"
              id="password"
              name="password"
              disabled
              placeholder="*************"
            />
            <Link
              to="/change-password"
              className="h-full w-24 text-white border-l border-buttonColor hover:bg-buttonColor rounded-r-lg flex items-center justify-center"
            >
              Modifier
            </Link>
          </div>
        </div>
        <div className="flex justify-evenly gap-10">
          <button
            className="hover:bg-red-600 hover:border-red-600 border-buttonColor shadow-indigo-500/30 shadow-lg text-center text-sm mt-4 border text-white rounded-full px-3 py-2 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Supprimer le compte
          </button>
          {showModal && (
            <div>
              <DeleteAccountModal closeDeleteAccountModal={closeDeleteAccountModal} />
            </div>
          )}
          <button
            className="hover:bg-custom-purple border-buttonColor shadow-lg shadow-indigo-500/30 text-center text-sm mt-4 border text-white rounded-full px-3 py-2 lg:m-0 lg:my-8 lg:text-base lg:px-6 lg:py-2"
            type="submit"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
}
export default Account;
