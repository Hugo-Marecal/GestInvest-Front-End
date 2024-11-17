import { toast } from 'react-toastify';
import { BaseURL, header } from './settingsApi';

export const GetAccountInfo = async () => {
  try {
    const response = await fetch(`${BaseURL}account/`, {
      method: 'GET',
      headers: header,
    });
    const dataGetAccountInfo = await response.json();
    if (!response.ok) {
      throw new Error(dataGetAccountInfo.message);
    }
    return dataGetAccountInfo;
  } catch (error) {
    console.error('Error fetching account', error);
    throw error;
  }
};

interface UserData {
  email: string;
  last_name: string;
  first_name: string;
  password: string;
}

export const sendNewAccountInfo = async (userData: UserData) => {
  try {
    const response = await fetch(`${BaseURL}account/`, {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify(userData),
    });

    const newData = await response.json();

    if (response.ok) {
      if (newData.token) {
        localStorage.setItem('token', newData.token);
      }
      return newData;
    }
    toast.error('Veuillez renseigner votre mot de passe pour sauvegarder les modifications');
    console.error('Erreur de soumission des données');
    return null;
  } catch (error) {
    console.error('Error data not send', error);
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await fetch(`${BaseURL}account/delete`, {
      method: 'PATCH',
      headers: header,
    });
    if (response.ok) {
      console.log('Compte supprimé avec succès');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Erreur lors de la suppression du compte :', error);
    throw error;
  }
};
