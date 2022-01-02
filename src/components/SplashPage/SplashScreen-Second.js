import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TenderLogo from '../../images/tender-logo.svg';

const SplashScreenSecond = () => {
  const routeParams = useParams();

  useEffect(() => {
    // console.log(routeParams);
  }, []);

  return (
    <div className="relative w-full h-screen text-white hero-image2">
      <div className="absolute bottom-0 left-0 mb-32 flex flex-col w-full gap-8 px-8">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <img className="inline-block" src={TenderLogo} alt="tender-logo" />
          </div>
          <div className="text-center">
            <h1 className="inline-block font-600 text-16">WUAY</h1>
          </div>
        </div>
        <div className="w-full text-14 mb-4 text-center">
          <p>Menu sin contacto facil y rapido</p>
        </div>
        <div className="flex gap-4">
          {/* eslint-disable-next-line react/button-has-type */}
          <Link
            to={`/commerce/${routeParams?.idCommerce}`}
            className="bg-transparent border-1 border-white rounded-4 text-14 px-8 py-4 w-1/2 block text-center"
          >
            Atras
          </Link>
          <Link
            to={`/home/${routeParams?.idCommerce}`}
            className="bg-transparent border-1 border-white rounded-4 text-14 px-8 py-4 w-1/2 block text-center"
          >
            Comenzar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreenSecond;
