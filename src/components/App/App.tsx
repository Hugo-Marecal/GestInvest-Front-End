import { ReactNode, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Account from '../Account/Account';
import AssetDetail from '../AssetDetail/AssetDetail';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Condition from '../Footer/footerSubComponent/Condition';
import Politique from '../Footer/footerSubComponent/Politique';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import ModalLogin from '../ModalLogin/ModalLogin';
import Page404 from '../Page404/Page404';
import Tendances from '../Tendances/Tendances';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to get the token from local storage and update the isConnected state
  const checkToken = () => {
    // Get the token from local storage
    const accessToken = localStorage.getItem('token');

    // Check if the token exists
    if (accessToken) {
      // If the token exists, set isConnected to true
      setIsConnected(true);
    } else {
      // If the token does not exist, set isConnected to false
      setIsConnected(false);
    }
  };

  // Call checkToken on the initial load of the application
  useEffect(() => {
    checkToken();
  }, []);

  type PrivateRouteProps = {
    children: ReactNode; // Use ReactNode to accept any type of child
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const PrivateRoute = ({ children }: PrivateRouteProps) => {
    // Get the token from local storage
    const accessToken = localStorage.getItem('token');
    // If the token is not present, redirect to the home page
    if (!accessToken) {
      return <Navigate to="/" />;
    }
    // Else, allow access
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>; // Use <>{children}</> to render the children
  };

  return (
    <div className="bg-gradient text-white font-roboto">
      <Header openModal={openModal} isConnected={isConnected} />
      <main className="min-h-[84vh] font-roboto ">
        <Routes>
          {/* We pass the openModal function as a prop to the HomePage component and isConnected state to conditionally render the right button. */}
          <Route path="/" element={<HomePage openModal={openModal} isConnected={isConnected} />} />
          <Route path="/Tendances" element={<Tendances />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/politique-de-confidentialite" element={<Politique />} />
          <Route path="/condition-utilisation" element={<Condition />} />
          {/* Protected Routes */}
          <Route
            path="/Account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/AssetDetail/:slug"
            element={
              <PrivateRoute>
                <AssetDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      {/* Condition to check if the modal is open */}
      {isModalOpen && <ModalLogin closeModal={closeModal} />}
      <Footer />
      <ToastContainer
        className="fixed top-[11vh]"
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
