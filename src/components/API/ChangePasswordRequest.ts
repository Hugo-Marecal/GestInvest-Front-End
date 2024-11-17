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
  currentPassword: string;
  newPassword: string;
  confirmation: string;
}

export const sendNewPassword = async (userData: UserData) => {
  try {
    const response = await fetch(`${BaseURL}account/edit-password`, {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify(userData),
    });

    const newData = await response.json();
    if (response.ok) {
      return newData;
    }
    toast.error(newData.message);
    console.error('Erreur de soumission des données');
    return null;
  } catch (error) {
    console.error('Error data not send', error);
    throw error;
  }
};
