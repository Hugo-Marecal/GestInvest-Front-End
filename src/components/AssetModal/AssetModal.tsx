import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAssetList, addBuyLine, addSellLine } from '../API/assetModalRequest';

type AssetModalProps = {
  closeAssetModal: () => void;
};

interface Asset {
  asset_name: string;
  category_name: string;
}

interface AssetApiResponse {
  allAsset: Asset[];
}

function AssetModal({ closeAssetModal }: AssetModalProps) {
  const [formData, setFormData] = useState({
    asset_name: '',
    asset_number: '',
    price: '',
    date: '',
    fees: '',
  });

  const [assetDataList, setAssetDataList] = useState<AssetApiResponse | null>(null);

  async function assetList() {
    try {
      const data = await getAssetList();
      setAssetDataList(data);
    } catch (error) {
      console.error('Erreur de récupération des données:', error);
    }
  }

  useEffect(() => {
    assetList();
  }, []);

  // The handleChange function, applied to all form inputs, updates the formData state when the user fills in an input field.
  // Here we use the spread operator to copy the entire object and modify only the value to be updated.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // The handleSubmitBuy function adds a buy transaction
  async function handleSubmitBuy(event: React.FormEvent) {
    event.preventDefault();

    // Clean the form data with DOMPurify
    const sanitizedFormData = {
      asset_name: DOMPurify.sanitize(formData.asset_name),
      asset_number: DOMPurify.sanitize(formData.asset_number),
      price: DOMPurify.sanitize(formData.price),
      date: DOMPurify.sanitize(formData.date),
      fees: DOMPurify.sanitize(formData.fees),
    };

    const addLine = await addBuyLine(sanitizedFormData);
    if (addLine) {
      setFormData({
        asset_name: '',
        asset_number: '',
        price: '',
        date: '',
        fees: '',
      });
      toast.success('Ajout réalisé avec succès');
    }
  }

  // The handleSubmitSell function adds a sell transaction
  async function handleSubmitSell(event: React.FormEvent) {
    event.preventDefault();

    const sanitizedFormData = {
      asset_name: DOMPurify.sanitize(formData.asset_name),
      asset_number: DOMPurify.sanitize(formData.asset_number),
      price: DOMPurify.sanitize(formData.price),
      date: DOMPurify.sanitize(formData.date),
      fees: DOMPurify.sanitize(formData.fees),
    };

    const addLine = await addSellLine(sanitizedFormData);
    if (addLine) {
      setFormData({
        asset_name: '',
        asset_number: '',
        price: '',
        date: '',
        fees: '',
      });
      toast.success('Ajout réalisé avec succès');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <dialog
        open
        className="fixed top-2/4 left-2/4 bg-[#2a213c] border border-buttonColor rounded-xl shadow-lg p-4 w-5/6 md:w-2/4 xl:w-2/5 2xl:w-2/6 transform -translate-x-2/4 -translate-y-2/4"
      >
        <button type="button" onClick={closeAssetModal} className="text-white p-2 absolute right-5 top-2">
          X
        </button>
        <div className="text-white text-centertext-3xl flex justify-center gap-x-16 mt-6">
          <p>Ajouter une transaction</p>
        </div>
        <form action="">
          <div className="flex flex-col justify-center items-center p-4">
            <label htmlFor="asset_name" className="pt-4 pb-2 text-white w-full text-start">
              Actif
            </label>
            <input
              list="assetNameList"
              id="asset_name"
              name="asset_name"
              value={formData.asset_name}
              onChange={handleChange}
              required
              placeholder="Veuillez entrer le nom de l'actif"
              className="rounded-md p-1 w-full "
            />
            {/* Add our assets to a dropdown list */}
            <datalist id="assetNameList">
              {assetDataList &&
                assetDataList.allAsset
                  .sort((a, b) => a.asset_name.localeCompare(b.asset_name))
                  .map((asset: { asset_name: string }, index: number) => (
                    <option key={index} value={asset.asset_name}>
                      {asset.asset_name}
                    </option>
                  ))}
            </datalist>
            <label htmlFor="asset_number" className="pt-4 pb-2 text-white w-full text-start">
              Nombre de parts
            </label>
            <input
              type="number"
              id="asset_number"
              name="asset_number"
              value={formData.asset_number}
              onChange={handleChange}
              required
              placeholder="Veuillez entrer le nombre de parts"
              className="rounded-md p-1 w-full"
            />
            <label htmlFor="price" className="pt-4 pb-2 text-white w-full text-start">
              Prix unitaire de l&apos;actif ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Veuiller entrer le prix"
              className="rounded-md p-1 w-full"
            />
            <label htmlFor="date" className="pt-4 pb-2 text-white w-full text-start">
              Date de la transaction
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="rounded-md p-1 w-full"
            />
            <label htmlFor="fees" className="pt-4 pb-2 text-white w-full text-start">
              Frais de la transaction (%)
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="Veuillez entrer le pourcentage des frais"
              required
              className="rounded-md p-1 w-full"
            />
          </div>

          <div className="flex items-center justify-center w-full gap-8">
            <input
              type="button"
              value="Achat"
              className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-green-600 hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
              onClick={handleSubmitBuy}
            />

            <input
              type="button"
              value="Vente"
              className="w-1/3 p-2 my-6 hover:border-custom-purple font-bold hover:bg-red-600 hover:text-white text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
              onClick={handleSubmitSell}
            />
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default AssetModal;
