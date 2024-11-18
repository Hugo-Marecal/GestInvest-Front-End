import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteAccount } from '../API/accountRequest';

type DeleteAccountModalProps = {
  closeDeleteAccountModal: () => void;
};

function DeleteAccountModal({ closeDeleteAccountModal }: DeleteAccountModalProps) {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const isDeleted = await deleteAccount();

      if (isDeleted) {
        closeDeleteAccountModal();
        localStorage.removeItem('token');
        toast.success('Account successfully deleted', {
          autoClose: 2800,
          pauseOnHover: false,
        });
        setTimeout(() => {
          navigate(0);
        }, 3000);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte :', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <dialog
        open
        className="fixed top-2/4 left-2/4 bg-[#2a213c] border border-buttonColor rounded-xl shadow-lg p-4 w-5/6 md:w-2/4 xl:w-2/5 2xl:w-2/6 transform -translate-x-2/4 -translate-y-2/4"
      >
        <button type="button" onClick={closeDeleteAccountModal} className="text-white p-2 absolute right-5 top-2">
          X
        </button>
        <div className="text-white text-centertext-3xl flex justify-center gap-x-16 mt-6">
          <p>Voulez vous vraiment supprimer votre compte ?</p>
        </div>
        <div className="flex items-center justify-center w-full gap-8">
          <input
            type="button"
            value="Confirmer"
            className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-buttonColor hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
            onClick={handleDeleteAccount}
          />

          <input
            type="button"
            value="Annuler"
            className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-red-600 hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
            onClick={closeDeleteAccountModal}
          />
        </div>
      </dialog>
    </div>
  );
}
export default DeleteAccountModal;
