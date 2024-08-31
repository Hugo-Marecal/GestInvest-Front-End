import { Helmet } from 'react-helmet-async';
import quatre from '../../assets/404-4.png';
import astronaute from '../../assets/astronaute.png';

export default function BackgroundBeamsDemo() {
  return (
    <>
      <Helmet>
        <title>GestInvest - Page 404</title>
        <meta
          name="description"
          content="Oups ! Il semblerait que vous soyez égaré. Vous êtes sur la page 404 de GestInvest."
        />
      </Helmet>
      <div className="h-[84vh] w-full rounded-md bg-black/35 relative flex flex-col items-center justify-center antialiased ">
        <div className="flex flex-col items-center sm:w-5/6 lg:w-3/5 p-8">
          <div className="flex gap-4 sm:gap-14 mb-9 justify-center">
            <img className="w-1/6 z-20" src={quatre} alt="" />
            <img className="w-[15%] z-20 animate-spin" src={astronaute} alt="" />
            <img className="w-1/6 z-20" src={quatre} alt="" />
          </div>
          <div>
            <p className="uppercase text-xl font-bold text-center">🚀 Oups ! Il semblerait que vous soyez égaré. 🚀</p>
          </div>
        </div>
      </div>
    </>
  );
}
