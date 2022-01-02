import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import IconMenu from '../images/icons/Logo-Menu-White.svg';
import LogoRomperHielo from '../images/icons/Logo-RomperElhielo-White.svg';
import DialogComingSoon from './Dialogs/DialogComingSoon';
import { getInfoCommerce } from '../store/app/commerceSlice';

const Home = () => {
  const dispatch = useDispatch();

  const routeParams = useParams();

  const { commerce } = useSelector(({ commerces }) => commerces);

  useEffect(() => {
    // TODO TRAER DATOS DEL COMMERCIO CON ROUTEPARAMS.IDCOMMERCE
    const id = routeParams.idCommerce ? parseInt(routeParams?.idCommerce, 10) : 0;
    localStorage.setItem('@Menu', id);
    dispatch(getInfoCommerce(id));
  }, [dispatch, routeParams]);

  return (
    <>
      <div
        className="flex flex-col justify-center w-full h-screen gap-16"
        style={{
          background: 'no-repeat center/cover',
          backgroundImage: `url(${commerce?.banner?.url})`,
        }}
      >
        <div className="w-full flex flex-col gap-8">
          <div className="flex justify-center">
            <img
              src={commerce?.logo?.url}
              alt="Restaurante"
              className="w-60 h-60 inline-block border-4 border-white rounded-full shadow-lg"
            />
          </div>
          <div className="flex justify-center text-center">
            <div className="text-white">
              <h2
                className="inline-block font-700 text-14"
                style={{ textShadow: '2px 2px rgba(0,0,0,0.3)' }}
              >
                {commerce?.name}
              </h2>
              {/* <p className="text-10 font-600" style={{ textShadow: '2px 2px rgba(0,0,0,0.4)' }}> */}
              {/*  ¿Qué quieres hacer? */}
              {/* </p> */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-20 justify-center text-white">
          <div className="flex justify-center">
            <Link
              to={`/menu/${routeParams?.idCommerce}`}
              style={{ background: 'rgba(0,0,0,0.3)' }}
              className="flex justify-center rounded-16 shadow-lg w-92 h-92 "
            >
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <img src={IconMenu} alt="icon-menu" className="w-32 h-32 inline-block" />
                </div>
                <div className="mt-4">
                  <p className="text-10">Ver el menu</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              to={`/intro-game/${routeParams?.idCommerce}`}
              style={{ background: 'rgba(0,0,0,0.3)' }}
              className="flex justify-center rounded-16 w-92 h-92 shadow-lg "
              onClick={() => {
                // dispatch(openComingSoonDialog());
              }}
            >
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <img
                    src={LogoRomperHielo}
                    alt="romper-el-hielo"
                    className="w-32 h-32 inline-block"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-10">Romper el hielo</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <DialogComingSoon />
    </>
  );
};

export default Home;
