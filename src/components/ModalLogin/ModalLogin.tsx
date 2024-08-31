import { useState } from 'react';
import Login from './modalsubcomponent/Login';
import Register from './modalsubcomponent/Register';

interface ModalProps {
  closeModal: () => void;
}

function ModalLogin({ closeModal }: ModalProps) {
  // State variable to manage the active tab (registration or login)
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      {/* blurry background */}
      <div className="absolute inset-0 bg-gray-800 bg-opacity-40" />
      <dialog
        open
        className="fixed top-2/4 left-2/4 bg-[#2a213c] border border-buttonColor rounded-xl shadow-lg p-4 w-5/6 md:w-2/4 xl:w-2/5 2xl:w-2/6 transform -translate-x-2/4 -translate-y-2/4"
      >
        <button type="button" className="text-white p-2 absolute right-5 top-2 hover:text-red-600" onClick={closeModal}>
          X
        </button>

        <div className="sm: mx-8 md:mx-14 lg:mx-28">
          {/* Button to switch between registration and login */}
          <div className="text-white flex justify-between items-center w-full pt-10 pb-0">
            <button
              type="button"
              className={`uppercase font-bold ${
                activeTab === 'register' ? 'underline underline-offset-8' : 'text-stone-400'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Inscription
            </button>

            <button
              type="button"
              className={`uppercase font-bold ${activeTab === 'login' ? 'underline underline-offset-8' : 'text-stone-400'}`}
              onClick={() => setActiveTab('login')}
            >
              Connexion
            </button>
          </div>

          {/* Form register */}
          {activeTab === 'register' && <Register closeModal={closeModal} email="" password="" />}
          {/* Form sign in */}
          {activeTab === 'login' && <Login closeModal={closeModal} />}
        </div>
      </dialog>
    </div>
  );
}

export default ModalLogin;
