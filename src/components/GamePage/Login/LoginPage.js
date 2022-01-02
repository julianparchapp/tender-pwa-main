/* eslint-disable react/self-closing-comp */
import { Link, useHistory } from 'react-router-dom';
import { Autocomplete, Button, TextField } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import useGeolocation from 'react-hook-geolocation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NextArrowWhite from '../../../images/icons/Next-Arrow-White.svg';
import CoverBlackLogin from '../../../images/CoverFullBlacksvg.svg';
import { getCommerceAround } from '../../../store/app/commerceSlice';
import { submitLogin } from '../../../store/app/loginSlice';
import { auth, firebase } from '../../../services/firebase';
import ValidateNumberPage from '../ValidateNumberPage';
import AlertCustom from '../../../shared-components/AlertCustom';

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

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  commerce: yup.string().required('Seleccione un comercio.'),
  phone: yup
    .string()
    // .matches(/^[0-9]+$/, 'Solo números.')
    .min(9, 'Ingrese un numero valido')
    // .max(9, 'Ingrese un numero valido')
    .required('Ingrese su número de celular.'),
  // policy: Yup.boolean().oneOf([true], 'This field must be checked'),
});

const defaultValues = {
  commerce: '',
  phone: '',
};

const LoginPage = () => {
  const classes = useStyles();
  const geolocation = useGeolocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');
  const { commercesAround } = useSelector(({ commerces }) => commerces);
  const [nameCommerce, setNameCommerce] = useState('');
  const menuLocalStorage = localStorage.getItem('@Menu') || 0;

  const { control, setValue, formState, handleSubmit, reset, trigger, setError, getValues } =
    useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!commercesAround) {
      dispatch(
        getCommerceAround({
          latitude: geolocation?.latitude?.toString(),
          longitude: geolocation?.longitude?.toString(),
          with_location: 1,
        })
      );
    }
  }, [dispatch, geolocation]);

  // Sent OTP
  const signin = () => {
    // event.preventDefault();
    // console.log('SIGNIN');
    const dataForm = getValues();
    // console.log('myNumber', dataForm?.phone);

    if (!dataForm?.phone || dataForm?.phone.length <= 9) return;
    const verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });
    auth
      .signInWithPhoneNumber(dataForm?.phone, verify)
      .then((result) => {
        // TODO : ALMACENAR EL FINAL
        // TODO : REDIRECTO TO VALIDATE PAGE
        console.log('ENTREE');
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
        // TODO : DISPATCH LOGIN
        dispatch(
          submitLogin({ id_token_string: result?.user?._lat, commerce_id: dataForm?.commerce })
        )
          .then((res) => {
            // console.log('res login', res);
            // dispatch(getInfoUser());
            if (res.type === 'auth/loginError') {
              history.push('/login');
              history.go(0);
            } else {
              history.push('/chat-public');
              history.go(0);
            }
          })
          .catch((err) => {
            history.push('/login');
            history.go(0);
            console.log('Error en el login');
          });
      })
      .catch((err) => {
        console.log('Wrong code');
        history.push('/login');
        history.go(0);
      });
  };

  function onSubmit(model) {
    // TODO : DISPATCH TO SAVE DATA USER
    // dispatch(setDataLogin(model));
    signin();
    return false;
  }

  return (
    <>
      {!show ? (
        <div
          className="w-full h-screen  flex justify-center text-white"
          style={{
            background: 'no-repeat center/cover',
            backgroundImage: `url(${CoverBlackLogin})`,
          }}
          // style={{ background: '#051B34' }}
        >
          {/* <div className="w-full flex flex-col items-center" style={{ width: '90%' }}> */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
            style={{ width: '90%' }}
          >
            <div className="w-full flex justify-start mt-32">
              <Link to={`/home/${menuLocalStorage}`} className="inline-block flex">
                <div>
                  <img
                    src="assets/icons/Back-Arrow.svg"
                    alt="icon-back"
                    className="inline-block w-8"
                  />
                </div>
                <p className="pl-4 font-500">Atras</p>
              </Link>
            </div>
            <div className="w-full flex flex-col items-center space-y-16 mt-12">
              <img src="assets/icons/Login-icon.svg" alt="login-icon" className="block w-40 h-40" />
              <h3 className="block font-600 text-12 text-center">Inicio de sesion</h3>
              <div className="w-full">
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
                        setValue('commerce', newValue?.id, { shouldDirty: true });
                        setNameCommerce(commercesAround.find((item) => item.id === newValue?.id));
                      }}
                    />
                  )}
                />

                <p className="mt-8 mb-8 text-11 font-700">Celular :</p>
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
              </div>
            </div>
            <div className="flex flex-col space-y-4 my-8">
              <Link to="/register" className="flex justify-center">
                <span className="pl-4 font-500 text-12">No tengo cuenta</span>
              </Link>
              <a
                href="https://pos.wuay.com.co/terminos-y-condiciones-chat/"
                target="_blank"
                className="block w-full text-center font-600 text-8 mt-8 sm:text-9 md:text-10"
                rel="noreferrer"
              >
                <span className="pl-4 font-400 text-10">Politicas de privacidad</span>
              </a>
            </div>
            <div id="recaptcha-container" className="py-8"></div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Button
              // to="/chat-public"
              type="submit"
              variant="contained"
              value="btn_login"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              className="w-full block flex justify-center items-center mb-32 space-x-8 py-4 mt-8 rounded-12 border-1 border-white"
              style={{ background: '#FF004E' }}
            >
              <span className="block pl-4 font-500 text-center text-11">Iniciar</span>
              <div className="flex items-center">
                <img src={NextArrowWhite} alt="icon-back" className="w-8 h-8 block" />
              </div>
            </Button>
          </form>
          {/* </div> */}
        </div>
      ) : (
        <ValidateNumberPage setotp={setotp} ValidateOtp={ValidateOtp} />
      )}
      <AlertCustom />
    </>
  );
};

export default LoginPage;
