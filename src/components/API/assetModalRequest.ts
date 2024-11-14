import { toast } from 'react-toastify';
import { BaseURL, header } from './settingsApi';

interface FormData {
  asset_name: string;
  asset_number: string;
  price: string;
  date: string;
  fees: string;
}

export const addBuyLine = async (formData: FormData) => {
  try {
    const response = await fetch(`${BaseURL}dashboard/buy`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return true;
    }
    const data = await response.json();
    console.error('Erreur de soummission des données');
    toast.error(data.message);
    return false;
  } catch (error) {
    console.error('Erreur de récupération des données', error);
    throw error;
  }
};

export const addSellLine = async (formData: FormData) => {
  try {
    const response = await fetch(`${BaseURL}dashboard/sell`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      return true;
    }
    const data = await response.json();
    console.error('Erreur de soummission des données');
    toast.error(data.message);
    return false;
  } catch (error) {
    console.error('Erreur de récupération des données', error);
    throw error;
  }
};

export const getAssetList = async () => {
  try {
    const response = await fetch(`${BaseURL}dashboard/modal`, {
      method: 'GET',
      headers: header,
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return null;
  } catch (error) {
    console.error('Erreur de récupération des données:', error);
    throw error;
  }
};

// export default { addBuyLine, addSellLine, getAssetList };
