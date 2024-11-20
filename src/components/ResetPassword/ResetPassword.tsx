import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword, verifyToken } from '../API/forgotPasswordRequest';

interface UserData {
  password: string;
  confirmation: string;
}

function ResetPassword() {
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    password: '',
    confirmation: '',
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        const isValidToken = token ? await verifyToken(token) : null;
        if (!isValidToken) {
          toast.error('Accès non autorisé');
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    if (token) {
      validateToken();
    } else {
      toast.error('Accès non autorisé');
      navigate('/');
    }
  }, [token, navigate]);

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
      const data = token ? await resetPassword(userData, token) : null;
      if (data) {
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur envoi des données:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[84vh] m-auto items-center justify-center w-full p-6 sm:w-5/6 lg:w-3/6">
      <Helmet>
        <title>GestInvest - Reset mot de passe</title>
        <meta
          name="description"
          content="Sur la page de reset mot de passe, vous pouvez réinitialiser votre mot de passe."
        />
      </Helmet>
      <h2 className="text-lg uppercase font-bold p-10 sm:text-xl md:text-2xl xl:text-3xl">Gestion du profil</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label className="py-4 pl-2 sm:p-4 text-xs md:text-sm font-bold" htmlFor="password">
              Password :
            </label>
          </div>
          <input
            className=" pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="password"
            id="password"
            name="password"
            placeholder="**********"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex border border-buttonColor rounded-xl bg-white/10 w-full">
          <div className="flex border-r border-buttonColor w-2/5">
            <label className="py-4 pl-2 sm:p-4 text-xs font-bold md:text-sm" htmlFor="confirmation">
              Confirmation :
            </label>
          </div>
          <input
            className=" pl-2 bg-transparent w-full rounded-r-lg sm:pl-4"
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="**********"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex justify-evenly gap-10">
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
export default ResetPassword;
