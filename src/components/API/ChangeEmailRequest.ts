import { toast } from 'react-toastify';
import { BaseURL, header } from './settingsApi';

const sendNewEmail = async (newEmail: string) => {
  try {
    const response = await fetch(`${BaseURL}account/edit-mail`, {
      method: 'PATCH',
      headers: header,
      body: JSON.stringify({
        email: newEmail,
      }),
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

export default sendNewEmail;
