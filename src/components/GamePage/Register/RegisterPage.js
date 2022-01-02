/* eslint-disable react/self-closing-comp */
import { Link, useHistory } from 'react-router-dom';
import { Autocomplete, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useGeolocation from 'react-hook-geolocation';
import NextArrowWhite from '../../../images/icons/Next-Arrow-White.svg';
import CoverBlackLogin from '../../../images/CoverFullBlacksvg.svg';
import { getCommerceAround } from '../../../store/app/commerceSlice';
import ValidateNumberPage from '../ValidateNumberPage';
import { registerUser, setDataLogin } from '../../../store/app/loginSlice';
import { auth, firebase } from '../../../services/firebase';
import { openAlert } from '../../../store/app/alertSlice';
import AlertCustom from '../../../shared-components/AlertCustom';
import jwtService from '../../../services/jwtService';

const FakeLocations = [
  { id: 1, title: 'Restaurante 1' },
  { id: 2, title: 'Restaurante 2' },
  { id: 3, title: 'Restaurante 3' },
];

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: '#051B34',
    background: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  },
})(TextField);

const GreenCheckbox = withStyles({
  root: {
    color: '#FFF !important',
    '&$checked': {
      color: '#FF004E !important',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  commerce: yup.string().required('Seleccione un comercio.'),
  phone: yup
    .string()
    .min(9, 'Ingrese un numero valido')
    // .max(9, 'Ingrese un numero valido')
    .required('Ingrese su número de celular.'),
  name: yup.string().required('Ingrese su nombre.'),
  terms: yup.boolean().required('Debe de aceptar las politicas.'),
});

const defaultValues = {
  commerce: '',
  phone: '',
  name: '',
  terms: false,
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const geolocation = useGeolocation();
  const classes = useStyles();
  const [checkedG, setCheckedG] = useState(false);
  const { commercesAround } = useSelector(({ commerces }) => commerces);
  const { dataLogin } = useSelector(({ login }) => login);
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');
  const [nameCommerce, setNameCommerce] = useState('');
  const loginToken = jwtService.getAccessToken();
  // const login = useSelector(({ auth }) => auth.login);

  useEffect(() => {
    if (loginToken) {
      history.push('/chat-public');
    }
  }, [loginToken]);

  useEffect(() => {
    if (!commercesAround) {
      dispatch(
        getCommerceAround({
          latitude: geolocation?.latitude?.toString(),
          longitude: geolocation?.longitude?.toString(),
          with_location: 1,
        })
      ).then(() => {
        console.log(commercesAround);
      });
    }
  }, [dispatch, geolocation]);

  const { control, setValue, formState, handleSubmit, reset, trigger, setError, getValues } =
    useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  const handleChange = (event) => {
    setCheckedG(event.target.checked);
    setValue('terms', event.target.checked);
  };

  // Sent OTP
  const signin = () => {
    // event.preventDefault();
    console.log('SIGNIN');
    const dataForm = getValues();
    console.log('myNumber', `+51${dataForm?.phone}`);

    if (!dataForm?.phone || dataForm?.phone.length <= 9) return;
    const verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
    auth
      .signInWithPhoneNumber(dataForm?.phone, verify)
      .then((result) => {
        console.log('SIGNIN ENTRE ??');
        setfinal(result);
        setshow(true);
      })
      .catch((err) => {
        console.log('ERROR:', err);
        history.go(0);
      });
  };

  // Validate OTP
  const ValidateOtp = (event) => {
    event.preventDefault();
    const dataForm = getValues();

    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success
        // TODO : REDIRECT TO REGISTER GROUP
        localStorage.setItem('@token-validate', result?.user?._lat);
        dispatch(
          registerUser({
            id_token_string: result?.user?._lat,
            commerce_id: dataForm?.commerce,
            name: dataForm?.name,
            terms_and_conditions: dataForm?.terms,
          })
        );
        // TODO AGREGAR EL TOKEN JWT AL LOCALSTORAGE
        history.push('/register-group');
      })
      .catch((err) => {
        console.log('Wrong code');
      });
  };

  function onSubmit(model) {
    // TODO : DISPATCH TO SAVE DATA USER
    if (!model.terms) {
      dispatch(openAlert({ message: 'Debe de aceptar las politicas', severity: 'error' }));
    } else {
      dispatch(setDataLogin(model));
      signin();
    }
    return false;
  }

  return (
    <>
      {!show ? (
        <div
          className="w-full h-full flex justify-center text-white pb-16 mb-16 overflow-y-scroll"
          style={{
            background: 'no-repeat center/cover',
            backgroundImage: `url(${CoverBlackLogin})`,
            position: 'fixed',
            minWidth: '100%',
            minHeight: '100%',
          }}
          // style={{ background: '#051B34' }}
        >
          <div className="w-full flex flex-col items-center gap-8" style={{ width: '90%' }}>
            <div className="w-full flex justify-start mt-32">
              <Link to="/login" className="inline-block flex">
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
            <form onSubmit={handleSubmit(onSubmit)} className="pb-8">
              <div className="w-full flex flex-col items-center space-y-8">
                <img
                  src="assets/icons/Login-icon.svg"
                  alt="login-icon"
                  className="block w-32 h-32"
                />
                <h3 className="block font-600 text-12 text-center">Registro</h3>
                <div className="w-full">
                  <AlertCustom />
                  <p className="text-11 font-700">Donde Quieres romper el hielo :</p>
                  <Controller
                    name="commerce"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="commerce"
                        value={nameCommerce}
                        classes={classes}
                        options={commercesAround || []}
                        getOptionLabel={(option) => option.name || ''}
                        className="w-full mt-8"
                        size="small"
                        renderInput={(params) => {
                          return (
                            <CssTextField
                              error={!!errors.commerce}
                              helperText={errors?.commerce?.message}
                              {...params}
                              label=""
                              variant="outlined"
                              className="bg-transparent"
                              placeholder="Seleccione un comercio..."
                              fullWidth
                            />
                          );
                        }}
                        onChange={(event, newValue) => {
                          setValue('commerce', newValue?.id);
                          setNameCommerce(commercesAround.find((item) => item.id === newValue?.id));
                        }}
                      />
                    )}
                  />

                  <p className="mt-8 mb-4 text-11 font-700">Cual es tu nombre :</p>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <CssTextField
                        // error={!!errors.name}
                        // helperText={errors?.name?.message}
                        {...field}
                        className="w-full my-8 bg-white"
                        style={{ color: '#051B34' }}
                        label=""
                        variant="outlined"
                        id="custom-css-outlined-input"
                        size="small"
                      />
                    )}
                  />
                  <p className="text-red customError w-full text-left">{errors?.name?.message}</p>

                  <p className="mt-8 mb-4 text-11 font-700">Celular :</p>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CssTextField
                        // error={!!errors.phone}
                        // helperText={errors?.phone?.message}
                        {...field}
                        className="w-full my-8 bg-white"
                        style={{ color: '#051B34' }}
                        label=""
                        variant="outlined"
                        id="custom-css-outlined-input"
                        size="small"
                      />
                    )}
                  />
                  <p className="text-red customError w-full text-left">{errors?.phone?.message}</p>

                  <div className="flex flex-col mt-12 mb-8">
                    <div className="flex justify-center">
                      <span className="pl-4 font-500 text-10 text-center ">
                        Verificaremos tu número para que no suplanten tu identidad.
                      </span>
                    </div>
                    {/* <a */}
                    {/*  href="https://pos.wuay.com.co/terminos-y-condiciones-chat/" */}
                    {/*  target="_blank" */}
                    {/*  className="block w-full text-center font-600 text-8 mt-8 sm:text-9 md:text-10" */}
                    {/*  rel="noreferrer" */}
                    {/* > */}
                    {/*  <span className="pl-4 font-400 text-10">Politicas de privacidad</span> */}
                    {/* </a> */}
                  </div>

                  <div className="mt-8 w-full flex justify-center items-center">
                    <div className="w-4/5">
                      <FormControlLabel
                        control={
                          <Controller
                            name="terms"
                            control={control}
                            render={({ field }) => (
                              <GreenCheckbox
                                {...field}
                                checked={checkedG}
                                onChange={handleChange}
                                name="terms"
                              />
                            )}
                          />
                        }
                        // label="Acepto politicas de privacidad y tratamiento de datos"
                        label={
                          <a
                            href="https://pos.wuay.com.co/terminos-y-condiciones-chat/"
                            target="_blank"
                            className="inline-block w-full text-center font-600 text-8 sm:text-9 md:text-10"
                            rel="noreferrer"
                          >
                            <span className="pl-4 font-400 text-10">Politicas de privacidad</span>
                          </a>
                        }
                        className="block mb-8 text-center"
                        style={{ fontSize: '0.96rem !important', marginRight: '0px' }}
                      />
                    </div>
                  </div>
                </div>
                <div id="recaptcha-container" className="py-8"></div>
              </div>
              <Button
                type="submit"
                variant="contained"
                value="btn_login"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                className="w-full block flex justify-center items-center mb-32 space-x-8 py-4 rounded-12 border-1 border-white mb-16"
                style={{ background: '#FF004E' }}
              >
                <span className="block text-center pl-4 font-500 text-11">Registrar</span>

                <div className="flex items-center">
                  <img src={NextArrowWhite} alt="icon-back" className="w-8 h-8 block" />
                </div>
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <ValidateNumberPage setotp={setotp} ValidateOtp={ValidateOtp} />
      )}
    </>
  );
};

export default RegisterPage;
