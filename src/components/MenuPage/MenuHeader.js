import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoCommerce } from '../../store/app/commerceSlice';
import BackArrowWhite from '../../images/icons/Back-Arrow-icon.svg';

const MenuHeader = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();

  const { commerce } = useSelector(({ commerces }) => commerces);
  const [country, setCountry] = useState('');

  useEffect(() => {
    // TODO TRAER DATOS DEL COMMERCIO CON ROUTEPARAMS.IDCOMMERCE
    // console.log(routeParams);
    const id = routeParams ? routeParams?.idCommerce : 0;
    dispatch(getInfoCommerce(id));
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (commerce) {
      const dataCountry = commerce?.city?.country?.country;
      setCountry(dataCountry);
    }
  }, [dispatch, commerce]);
  return (
    <div className="gap-32 bg-transparent relative">
      <div className="pt-16 w-full mb-24 text-white flex justify-center">
        <div className="flex justify-center items-center w-1/3 absolute top-16 -left-16 cursor-pointer">
          <div className="pl-8">
            <Link to={`/home/${routeParams?.idCommerce}`} className="flex justify-center">
              <div>
                <img src={BackArrowWhite} alt="icon-back" className="inline-block w-8" />
              </div>
              <p className="pl-4 font-600">Atras</p>
            </Link>
          </div>
        </div>
        <div className="flex justify-start">
          <h4 className="text-12 font-600">Menu</h4>
        </div>
      </div>

      <div className="flex justify-center pb-16" style={{ color: '#051B34' }}>
        <div
          className="relative rounded-12 shadow-lg"
          style={{ width: '90%', background: 'rgba(0,0,0,0.3)' }}
        >
          <div className="flex justify-center w-full absolute logo-mid">
            <img
              src={commerce?.logo?.url}
              alt="restaurante-logo"
              className="w-44 h-44 inline-block border-4 border-white rounded-full shadow-lg"
            />
          </div>
          <div className="text-center text-white pb-8 mt-28">
            <h1 className="font-600 text-12">{commerce?.name}</h1>
            <p>{commerce?.attention_schedule}</p>
            {/* <p>{commerce?.email}</p> */}
            {/* <p>{commerce?.phone}</p> */}
            <p>{commerce?.address}</p>
            {/* <p> */}
            {/*  {commerce?.city?.city} - {country} */}
            {/* </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
