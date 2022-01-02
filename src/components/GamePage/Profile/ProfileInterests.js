import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import useForm from '../../../utilities/useFormHook';
import { getInterest, saveGroupInterest, selectInterests } from '../../../store/app/interestSlice';
import { openAlert } from '../../../store/app/alertSlice';
import AlertCustom from '../../../shared-components/AlertCustom';
import { logoutUser } from '../../../store/app/userSlice';
import { openTermsDialog } from '../../../store/app/dialogSlice';
import DialogTerms from '../../Dialogs/DialogTerms';

const Interest = [
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

const initialData = {
  user: '',
  name: '',
};

const ProfileInterests = ({ profileGroup }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allInterests = useSelector(selectInterests);
  const [dataInterest, setDataInterest] = useState([]);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitInterestProfile()
  );

  useEffect(() => {
    dispatch(getInterest());
  }, [dispatch]);

  useEffect(() => {
    setDataInterest(allInterests);
  }, [allInterests]);

  useEffect(() => {
    if (profileGroup) {
      setForm({ ...form, ...profileGroup });
      // setDataInterest(formatInterests(allInterests, formatData(profileGroup?.interests)));
    } else {
      setForm({ ...form, ...initialData });
    }
  }, [profileGroup]);

  function handleSubmitInterestProfile() {
    const DataSend = dataInterest.filter((item) => item.is_add === true);
    if (DataSend.length >= 4) {
      dispatch(saveGroupInterest(DataSend))
        .then((res) => {
          history.go(0);
        })
        .catch((err) => {
          console.log('Error al enviar los intereses.');
          dispatch(openAlert({ message: 'Error al enviar los intereses.', severity: 'error' }));
        });
      console.log(dataInterest);
    } else {
      dispatch(openAlert({ message: 'Seleccione al menos 4 intereses.', severity: 'error' }));
    }
  }

  const handleSelectInterest = (data) => {
    setDataInterest(changeDataInterest(dataInterest, changeStatus(data)));
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

  return (
    <div className="h-full">
      <AlertCustom />
      <h1 className="text-center font-500 my-4">Edita los temas de conversación</h1>
      <div
        // className="w-full flex flex-wrap whitespace-nowrap justify-around gap-8 py-8"
        className="w-full flex flex-wrap whitespace-nowrap py-8"
        // style={{ height: '280px' }}
      >
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
      <Button
        onClick={() => {
          handleSubmitInterestProfile();
        }}
        variant="contained"
        className="w-full flex items-center justify-center mb-12 mt-8 space-x-8 py-4 border-1 border-white text-white"
        style={{ background: '#FF004E', marginTop: '0.8rem' }}
      >
        <span className="block text-center pl-4 font-500 text-9 md:text-11">Guardar cambios</span>
      </Button>
      <a
        href="https://pos.wuay.com.co/terminos-y-condiciones-chat/"
        target="_blank"
        className="block w-full text-center font-600 text-8 mt-8 sm:text-9 md:text-10"
        rel="noreferrer"
      >
        Politicas
      </a>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className="block w-full text-center font-600 text-8 sm:text-9 md:text-10 my-4"
        rel="noreferrer"
        onClick={() => {
          dispatch(openTermsDialog());
        }}
      >
        Ver condiciones
      </a>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className="block w-full text-center font-600 text-8 sm:text-9 md:text-10"
        onClick={() => {
          dispatch(logoutUser());
        }}
      >
        Cerrar Sesión
      </a>
      <DialogTerms />
    </div>
  );
};

export default ProfileInterests;
