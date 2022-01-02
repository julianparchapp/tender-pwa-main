import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import TenderLogo from '../../images/tender-logo.svg';

const SplashScreenHome = () => {
  const routeParams = useParams();

  useEffect(() => {
    // console.log(routeParams);
  }, []);

  return (
    <div className="relative w-full h-screen text-white hero-image">
      <div className="absolute bottom-0 left-0 mb-32 flex flex-col gap-8 px-8">
        <div className="flex flex-col justify-center">
          <div className="flex justify-center mb-8">
            <img className="inline-block" src={TenderLogo} alt="tender-logo" />
          </div>
          <div className="text-center">
            <h1 className="inline-block font-600 text-16">WUAY</h1>
          </div>
        </div>
        <div className="text-14 text-center mb-4">
          <p>
            Rompe el hielo en tus lugares favoritos con personas que compartan tus intereses y temas
            de conversación.
          </p>
        </div>
        <div>
          <Link
            to={`/second/${routeParams?.idCommerce}`}
            className="bg-transparent border-1 border-white rounded-4 text-14 px-16 py-4 w-full block text-center"
          >
            Siguiente
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreenHome;
