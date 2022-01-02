import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CoverBlack from '../../../images/Cover-Black.svg';
import NextArrowWhite from '../../../images/icons/Next-Arrow-White.svg';
import { getInterest, saveGroupInterest, selectInterests } from '../../../store/app/interestSlice';
import AlertCustom from '../../../shared-components/AlertCustom';
import { openAlert } from '../../../store/app/alertSlice';

const FakeData = [
  {
    id: 1,
    name: 'Musica',
    select: true,
  },
  {
    id: 2,
    name: 'Irnos de fiesta',
    select: false,
  },
  {
    id: 3,
    name: 'Ligar',
    select: false,
  },
  {
    id: 4,
    name: 'Sueñosa',
    select: false,
  },
  {
    id: 5,
    name: 'De trabajo',
    select: false,
  },
  {
    id: 6,
    name: 'Miedos',
    select: true,
  },
  {
    id: 7,
    name: 'Libros',
    select: false,
  },
  {
    id: 8,
    name: 'Musica',
    select: false,
  },
  {
    id: 10,
    name: 'Expontaneo',
    select: false,
  },
  {
    id: 11,
    name: 'Viajes',
    select: false,
  },
  {
    id: 12,
    name: 'Amor',
    select: false,
  },
  {
    id: 13,
    name: 'Danza',
    select: false,
  },
  {
    id: 14,
    name: 'Juegos',
    select: false,
  },
  {
    id: 15,
    name: 'Películas',
    select: false,
  },
  {
    id: 16,
    name: 'Tecnología',
    select: false,
  },
  {
    id: 17,
    name: 'Politica',
    select: false,
  },
];

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({}).required();

const defaultValues = {
  interests: [],
};

const InterestPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSelectMin, setIsSelectMin] = useState();
  const [dataInterest, setDataInteres] = useState([]);
  const [dataToSave, setDataToSave] = useState([]);
  const interests = useSelector(selectInterests);

  const { control, formState, handleSubmit, reset, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    // console.log('interest');
    dispatch(getInterest());
  }, [dispatch]);

  useEffect(() => {
    setDataInteres(interests);
  }, [interests]);

  const handleSelectInterest = (data) => {
    setDataInteres(changeDataInterest(dataInterest, changeStatus(data)));
  };

  const changeDataInterest = (data, newData) => {
    return data.map((item) => {
      if (item.id === newData.id) return newData;
      return item;
    });
  };

  const changeStatus = (data) => {
    return {
      ...data,
      is_add: !data.is_add,
    };
  };

  const onSubmit = () => {
    // event.preventDefault();
    const DataSend = dataInterest.filter((item) => item.is_add === true);
    if (DataSend.length <= 3) {
      dispatch(openAlert({ message: 'Seleccione al menos 4 intereses.', severity: 'error' }));
    } else {
      dispatch(saveGroupInterest(DataSend))
        .then((res) => {
          history.push('/chat-public');
          history.go(0);
        })
        .catch((err) => {
          console.log('Error al enviar los intereses.');
        });
    }
    return false;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full  flex flex-col items-center text-white overflow-x-hidden relative"
      // style={{ background: 'no-repeat center/cover', backgroundImage: `url(${CoverBlackLogin})` }}
      // style={{ background: '#051B34' }}
    >
      <div
        className="w-full absolute top-0 z-10"
        style={{
          background: 'no-repeat center/cover',
          backgroundImage: `url(${CoverBlack})`,
          height: '130px',
          borderRadius: '0px 0px 30px 30px',
          marginBottom: '1.7rem',
        }}
      >
        <div className="w-full flex justify-start ml-16 mt-32">
          <Link to="/register-group" className="inline-block flex">
            <div>
              <img
                src="assets/icons/Back-Arrow.svg"
                alt="icon w-back"
                className="inline-block w-8"
              />
            </div>
            <p className="pl-4 font-500">Atras</p>
          </Link>
        </div>

        <div
          className="absolute -bottom-8 bg-white p-4 shadow-lg rounded-12 text-center"
          style={{ width: '290px', left: 'calc(50% - 145px)' }}
        >
          <span className="block text-black text-11 font-600"> Que les interesa charlar ?</span>
        </div>
      </div>
      <AlertCustom />
      <div
        // className="flex justify-center flex-wrap gap-8 items-center overflow-y-scroll py-16 column-chat z-0"
        // style={{ width: '94%', height: '370px' }}
        className="flex flex-wrap whitespace-nowrap py-8 z-0 mx-auto"
        style={{ width: '94%', marginTop: '86px' }}
      >
        {/* {dataInterest?.map((item) => ( */}
        {/*  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        {/*  <div */}
        {/*    className={`text-center shadow-lg rounded-8 ${ */}
        {/*      item?.is_add ? ' border-2 border-pink-500' : 'border-1 border-gray-200' */}
        {/*    }`} */}
        {/*    onClick={() => handleSelectInterest(item)} */}
        {/*  > */}
        {/*    <span className="block px-20 py-8 text-black">{item?.name}</span> */}
        {/*  </div> */}
        {/* ))} */}
        {dataInterest?.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={`max-w-min text-center shadow-lg rounded-4 mx-4 my-4 ${
              item?.is_add ? ' border-2 border-pink-500' : 'border-1 border-gray-200'
            }`}
            style={{ height: 'max-content' }}
            onClick={() => {
              handleSelectInterest(item);
            }}
          >
            <span className="text-8 sm:text-10 font-600 px-4 py-2" style={{ color: '#051B34' }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
      <div
        className="w-full flex flex-col justify-center items-center bg-white gap-4 py-8 px-16 fixed bottom-0"
        style={{
          boxShadow: '0px 1px 8px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px 20px 0px 0px',
        }}
      >
        <span className="block w-full text-center text-black font-600 text-10">
          Seleccione minimo 4
        </span>
        <button
          type="submit"
          // to="/chat-public"
          className="w-full py-4 border-1 border-white shadow-lg text-white text-11 font-600 rounded-8 flex items-center justify-center space-x-4"
          style={{ background: '#FF004E' }}
          // onClick={() => console.log('ENVIANDO', dataToSave)}
          // disabled={!(dataToSave.length >= 4)}
        >
          <p>Comenzar</p>
          <div className="flex flex-col items-center">
            <img src={NextArrowWhite} alt="icon-back" className="w-8 h-8 block" />
          </div>
        </button>
      </div>
    </form>
  );
};

export default InterestPage;
