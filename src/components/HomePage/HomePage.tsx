import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import imgHome from '../../assets/Gestinvest-dashboard-image.png';
import TradingViewTicker from './TradingViewTicker';

type HomePageProps = {
  isConnected: boolean;
  openModal: () => void;
};

const HomePage = ({ isConnected, openModal }: HomePageProps) => {
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimateImage(true);
    }, 1550);

    const params = new URLSearchParams(window.location.search);
    const clearLocalStorage = params.get('clearLocalStorage');
    const successMessage = params.get('successMessage');
    const errorMessage = params.get('errorMessage');

    if (clearLocalStorage) {
      localStorage.removeItem('token');
    }

    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Helmet>
        <title>GestInvest - Accueil</title>
        <meta
          name="description"
          content="GestInvest vous offre une plateforme complète pour suivre vos actifs et analyser leur performance. GestInvest vous donne les moyens de réaliser vos ambitions financières. Explorez de nouvelles opportunités dès aujourd'hui avec GestInvest."
        />
      </Helmet>
      <section className="flex m-auto h-[84vh] relative p-12 lg:w-5/6 2xl:w-5/5 overflow-hidden">
        <motion.div
          className="flex flex-col justify-center items-center sm:items-start md:w-5/6"
          initial={{ opacity: 0, x: -500 }} // Start with an opacity of 0 and scroll -500 pixels to the right
          animate={{ opacity: 1, x: 0 }} // Animate to an opacity of 1 and a position of origin
          transition={{ duration: 0.8 }} // Duration of transition of 1.5 seconds
        >
          <h1 className="text-center bg-gradient-to-r from-blue-400 to-red-400 text-transparent bg-clip-text font-bold text-3xl sm:text-start md:text-4xl lg:text-4xl lg:text-left xl:text-5xl">
            <span className="block">Suivez le rythme.</span>
            Optimisez vos rendements.
          </h1>
          <div className="lg:m-0 justify-center flex flex-col sm:block">
            <h2 className="text-center uppercase font-semibold py-6 sm:text-start md:text-2xl lg:text-xl lg:my-4 xl:text-3xl">
              Votre patrimoine, notre expertise.
            </h2>
            <p className="text-center text-md lg:text-base lg:w-full sm:text-start xl:text-lg xl:w-5/6">
              GestInvest vous offre une plateforme complète pour suivre vos actifs et analyser leur performance.
              GestInvest vous donne les moyens de réaliser vos ambitions financières. Explorez de nouvelles opportunités
              dès aujourd&apos;hui avec GestInvest.
            </p>
            {!isConnected && (
              <motion.button
                className="w-2/4 lg:w-1/3 m-auto hover:bg-custom-purple  hover:border-custom-purple shadow-lg shadow-indigo-500/30 text-center mt-4 border border-buttonColor text-white rounded-full px-2 py-1 lg:m-0 lg:my-8 xl:text-xl lg:px-6 lg:py-2"
                type="button"
                onClick={openModal}
              >
                Connexion
              </motion.button>
            )}
          </div>
        </motion.div>
        <motion.div
          className="flex-col justify-center items-center sm:items-start md:w-5/6 hidden md:flex"
          initial={{ opacity: 0, x: 500 }} // Start with an opacity of 0 and scroll 500 pixels to the left
          animate={{ opacity: 1, x: 0 }} // Animate to an opacity of 1 and a position of origin
          transition={{ duration: 0.8 }} // Duration of transition of 1.5 seconds
        >
          <img
            className={`w-5/6 opacity-80 m-auto lg:w-4/6 ${animateImage ? 'animate-bounce' : ''}`}
            src={imgHome}
            alt=""
          />
        </motion.div>
      </section>
      <div className="hidden sm:flex">
        <TradingViewTicker />
      </div>
    </>
  );
};

export default HomePage;
