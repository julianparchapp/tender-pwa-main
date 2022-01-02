import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BackArrowBlack from '../../images/icons/Back-Arrow-Black.svg';
import IconWuayBlack from '../../images/icons/Icon-Wuay-black.svg';
import MapPin from '../../images/icons/map-pin.svg';
import MessagePin from '../../images/icons/message-pin.svg';
import GroupPin from '../../images/icons/group-pin.svg';
import CoverWhite from '../../images/Cover-Bg-White.svg';

const introCaption = [
  {
    id: 1,
    icon: MapPin,
    caption:
      'Siempre que visites un cafe, bar, pub o discoteca, piensa en WUAY, avisanos cuando estes en tu lugar favorito.',
  },
  {
    id: 2,
    icon: MessagePin,
    caption: 'Cuentale a WUAY, que temas de conversación te interesan.',
  },
  {
    id: 3,
    icon: GroupPin,
    caption:
      'Conecta de forma natural con grupos de personas que visiten tus lugares favoritos y crea conversaciones interesantes de diversos temas.',
  },
  {
    id: 4,
    icon: GroupPin,
    caption: 'Tu ubicación no la compartiremos con nadie, solo buscamos lugares cercanos a ti.',
  },
];

const IntroPage = () => {
  const routeParams = useParams();
  const history = useHistory();
  const firstViewPage = window.localStorage.getItem('@firstViewPage');

  useEffect(() => {
    if (firstViewPage) {
      history.push('/login');
    }
  }, [firstViewPage]);

  return (
    <>
      <div
        className="w-full flex justify-center"
        style={{
          background: 'no-repeat center/cover',
          backgroundImage: `url(${CoverWhite})`,
          color: '#051B34',
        }}
      >
        <div className="" style={{ width: '90%' }}>
          <div className="flex mt-16">
            <Link to={`/home/${routeParams?.idCommerce}`} className="flex justify-center">
              <div>
                <img src={BackArrowBlack} alt="icon-back" className="inline-block w-8" />
              </div>
              <p className="pl-4 font-500">Atras</p>
            </Link>
          </div>
          <div className="w-full">
            <div className="flex justify-center items-center">
              <img src={IconWuayBlack} alt="icon-wuay" className="inline-block w-28 h-28" />
              <p className="ml-4 text-14 font-600">Wuay</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-36">
            <div className="w-full">
              {introCaption.map((item) => (
                <div
                  id={item.id}
                  className="w-full bg-white relative mb-32 rounded-12 flex justify-center py-20 shadow-lg"
                >
                  <div>
                    <div
                      className="flex justify-center absolute logo-dialog-absolute"
                      style={{ left: '44%' }}
                    >
                      <img
                        src={item.icon}
                        alt="icon-caption"
                        className="w-36 h-36 inline-block p-8 bg-white rounded-full shadow-lg"
                      />
                    </div>
                    <div className="text-center">
                      <p className="py-4 px-16 font-500 text-10">{item.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full text-center">
            <p className="font-500 text-10">No likes, no seguidores.</p>
            <p className="font-500 text-10">
              en Wuay la apariencia no es lo que mas importa, tu forma de pensar es nuestra app lo
              es todo.
            </p>
          </div>
          <div className="w-full flex items-center space-x-4 mt-24 mb-16 text-white text-11">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              to={`/home/${routeParams?.idCommerce}`}
              type="button"
              className="block w-1/2 flex justify-center items-center rounded-16 py-7"
              style={{ background: '#051B34' }}
            >
              <span className="block font-700">Volver</span>
            </Link>
            <button
              type="button"
              className="block w-1/2 rounded-16 py-6"
              style={{ background: '#FF004E' }}
              onClick={() => {
                window.localStorage.setItem('@firstViewPage', 'true');
                history.push('/login');
              }}
            >
              <span className="font-700">Romper el hielo</span>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center" style={{ background: '#F3F3F3' }}> */}
      {/*  <div className="" style={{ width: '90%' }} /> */}
      {/* </div> */}
    </>
  );
};

export default IntroPage;
