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
      throw new Error(dataGetAccountInfo.errorMessage);
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
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        email: userData.email,
        lastname: userData.last_name,
        firstname: userData.first_name,
        password: userData.password,
      }),
    });

    const newData = await response.json();

    if (response.ok) {
      toast.success('Mise a jour reussi');
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
