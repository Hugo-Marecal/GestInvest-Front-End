import { BaseURL, header } from './settingsApi';

const getAssetDetailData = async (asset: string | undefined) => {
  try {
    const response = await fetch(`${BaseURL}assetdetails/${asset}`, {
      method: 'GET',
      headers: header,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur de récupération des données', error);
    throw error;
  }
};

export default getAssetDetailData;
