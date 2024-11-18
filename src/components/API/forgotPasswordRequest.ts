import { toast } from 'react-toastify';
import { BaseURL } from './settingsApi';

export const sendEmailForgotPassword = async (email: string) => {
  try {
    const response = await fetch(`${BaseURL}auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    toast.error(data.message);
    console.error('Erreur de soumission des données');
    return null;
  } catch (error) {
    console.error('Error data not send', error);
    throw error;
  }
};

interface UserData {
  password: string;
  confirmation: string;
}

export const resetPassword = async (userData: UserData, token: string) => {
  console.log(userData);
  try {
    const response = await fetch(`${BaseURL}auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, token }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    toast.error(data.message);
    console.error('Erreur de soumission des données');
    return null;
  } catch (error) {
    console.error('Error data not send', error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const response = await fetch(`${BaseURL}auth/reset-password-verify-token?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error data not send', error);
    throw error;
  }
};
