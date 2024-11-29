import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Helmet } from 'react-helmet-async';
import GetDashboard from '../API/dashboardRequest';
import AssetModal from '../AssetModal/AssetModal';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardProps {
  totalEstimatePortfolio: number;
  gainOrLossPourcent: number;
  gainOrLossMoney: number;
  cryptoPercent: number;
  stockPercent: number;
  gainOrLossTotalPortfolio: string | null;
  assetUserInformation: AssetUserInformation[];
}

interface AssetUserInformation {
  symbol: string;
  quantity: number;
  assetName: string;
  totalInvestByAsset: number;
  totalEstimatedValueByAsset: number;
  assetCategory: string;
  assetPrice: number;
  gainOrLossTotalByAsset: string;
}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardProps | null>(null);

  // The State of the showModal is used to open or close the buy/sell modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const data = await GetDashboard();
        setIsLoading(false);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const closeAssetModal = () => {
    setShowModal(false);
    window.location.reload(); // reload the page to update the dashboard when we close the modal
  };

  // Function to get the available asset categories
  const getAssetCategories = () => {
    if (!dashboardData) return [];
    return [...new Set(dashboardData.assetUserInformation.map((asset) => asset.assetCategory))];
  };

  // Function to filter assets by category
  const filterAssetsByCategory = (category: string) => {
    if (!dashboardData) return [];
    return dashboardData.assetUserInformation.filter((asset) => asset.assetCategory === category);
  };

  // Function to set the color of the portfolio if it's in gain or loss
  const GetColorFolio = (gainOrLossTotalPortfolio: string) => {
    if (gainOrLossTotalPortfolio === 'positive') {
      return '#05cb05';
    }
    return 'red';
  };

  // Function to set the color of the asset if it's in gain or loss
  const GetcolorAsset = (gainOrLossTotalByAsset: string) => {
    if (gainOrLossTotalByAsset === 'positive') {
      return '#05cb05';
    }
    return 'red';
  };

  if (isLoading) {
    return <div className="flex justify-center items-center text-5xl h-screen">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>GestInvest - Tableau de bord</title>
        <meta
          name="description"
          content="Le tableau de bord est votre centre de contrôle, vous offrant une vue d'ensemble sur vos actifs, leurs performances et les tendances du marché."
        />
      </Helmet>
      <div className="flex flex-col w-[95%] md:w-[80%] lg:w-[70%] m-auto justify-center" id="dashboard">
        <section className="flex flex-col items-center border border-buttonColor rounded-3xl p-8 m-4  bg-[#ffffff0d]/5">
          <h2 className="text-lg uppercase font-bold mb-6 sm:text-center sm:text-xl md:text-2xl md:mb-10 xl:text-3xl">
            Mon Portefeuille
          </h2>

          <div className="flex flex-col justify-around sm:flex-row sm:gap-8 lg:gap-12 2xl:gap-20">
            <div className="flex items-center">
              <div className="flex flex-col sm:gap-2 md:gap-4">
                <p className="flex gap-2 md:text-xl xl:text-2xl flex-wrap">
                  Valeur estimée : <span className="font-bold block">{dashboardData?.totalEstimatePortfolio} $</span>
                </p>

                <p className="flex gap-2 md:text-xl xl:text-2xl flex-wrap">
                  Gain/Perte :{' '}
                  <span
                    className="font-bold block"
                    style={{
                      color: GetColorFolio(dashboardData?.gainOrLossTotalPortfolio ?? ''),
                    }}
                  >
                    {dashboardData?.gainOrLossMoney} $
                  </span>
                </p>
              </div>
            </div>
            <div className="flex w-52 m-auto md:w-60 2xl:w-80 items-center">
              <Doughnut
                data={{
                  labels: [`crypto`, `stock `],
                  datasets: [
                    {
                      label: 'Portfolio Composition',
                      data: [dashboardData?.cryptoPercent, dashboardData?.stockPercent],
                      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>

        <section className="assetModal">
          <div className="flex justify-center">
            <button
              type="button"
              className="w-3/4 md:w-2/4 valid-button p-2 mt-2 md:mt-6   hover:bg-custom-purple text-white rounded-xl shadow-lg shadow-indigo-500/30 border border-buttonColor"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Ajouter une transaction
            </button>

            {showModal && (
              <div>
                <AssetModal closeAssetModal={closeAssetModal} />
              </div>
            )}
          </div>
        </section>

        {/* Order by category, Crypto or Stock */}
        {getAssetCategories().map((category) => (
          <section className="p-2 mt-10" key={category}>
            <h2 className="text-sm uppercase font-bold mb-6 sm:text-base md:text-lg lg:text-xl">{category}</h2>
            <div className="hidden 2xl:grid grid-cols-4 text-xs text-center py-2 px-8 sm:text-sm md:text-base">
              <p className="col-span-1 text-start">Symbole</p>
              <p className="col-span-1">Valeur de l&apos;actif</p>
              <p className="col-span-1">Possédé</p>
              <p className="col-span-1 text-end">Valeur total</p>
            </div>
            <ul>
              {/* display assets by category */}
              {filterAssetsByCategory(category).map((asset) => (
                <li
                  className="grid grid-cols-4 justify-between items-center text-center border-buttonColor rounded-3xl py-2 px-8 my-2 xl:my-4 border bg-[#ffffff0d]/10 text-xs md:text-sm lg:text-base"
                  key={asset.symbol}
                >
                  <NavLink to={`/assetDetail/${asset.symbol}`} className="w-1/4 hidden 2xl:inline">
                    {asset.symbol}
                  </NavLink>

                  <p
                    className="col-span-1 hidden 2xl:inline"
                    style={{
                      color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                    }}
                  >
                    {asset.assetPrice} $
                  </p>
                  <p className="col-span-1 hidden 2xl:inline">{asset.quantity}</p>
                  <p
                    className="col-span-1 hidden 2xl:inline text-end"
                    style={{
                      color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                    }}
                  >
                    {asset.totalEstimatedValueByAsset} $
                  </p>

                  <div className="2xl:hidden flex flex-col text-start col-span-2">
                    <NavLink to={`/AssetDetail/${asset.symbol}`} className="flex gap-2">
                      <p className="font-bold">{asset.symbol}</p>
                      <p>{asset.assetName}</p>
                    </NavLink>

                    <p
                      style={{
                        color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                      }}
                    >
                      {asset.assetPrice} $
                    </p>
                  </div>
                  <div className="flex flex-col text-end 2xl:hidden col-span-2">
                    <p className="">{asset.quantity}</p>
                    <p
                      className=""
                      style={{
                        color: GetcolorAsset(asset.gainOrLossTotalByAsset),
                      }}
                    >
                      {asset.totalEstimatedValueByAsset} $
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
