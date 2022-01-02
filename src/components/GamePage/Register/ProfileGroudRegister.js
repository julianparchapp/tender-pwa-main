import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import NextArrowWhite from '../../../images/icons/Next-Arrow-White.svg';
import CoverBlack from '../../../images/Cover-Black.svg';
import CameraIcon from '../../../images/icons/camera-icon.svg';
import TenderBlack from '../../../images/tender-logo-black.svg';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond/dist/filepond.min.css';
// eslint-disable-next-line import/order
import { FilePond, registerPlugin } from 'react-filepond';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { saveGroupuser } from '../../../store/app/groupUserSlice';
import { openAlert } from '../../../store/app/alertSlice';
import AlertCustom from '../../../shared-components/AlertCustom';

registerPlugin(FilePondPluginImagePreview);

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#051B34',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#051B34',
      },
      '&:hover fieldset': {
        borderColor: '#051B34',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#051B34',
      },
    },
  },
})(TextField);

/**
 * Form Validation Schema
 */
const schema = yup
  .object()
  .shape({
    name: yup.string().required('Ingrese un nombre para su grupo'),
  })
  .required();

const defaultValues = {
  name: '',
  photos: [],
};

const ProfileGroudRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState([]);

  const { control, formState, handleSubmit, reset, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if (Object.keys(data.photos).length > 0) {
      dispatch(saveGroupuser(data))
        .then((res) => {
          console.log('res', res);
          history.push('/interest');
        })
        .catch((err) => {
          console.log('res2', err);
          dispatch(openAlert({ message: 'Error', severity: 'error' }));
        });
    } else {
      dispatch(openAlert({ message: 'Debe de subir al menos una imagen.', severity: 'error' }));
    }
    return null;
  };

  const handleSetImage = (files) => {
    setImage(files.map((img) => img.file));
    setValue(
      'photos',
      files.map((img) => img.file)
    );
  };

  return (
    <div
      className="w-full h-screen flex justify-center overflow-x-hidden overscroll-y-none"
      // style={{ background: 'no-repeat center/cover', backgroundImage: `url(${CoverBlackLogin})` }}
    >
      <div className="w-full flex flex-col gap-24">
        <div className="relative sticky top-0 z-10">
          <div className="w-full flex justify-start mt-32 absolute text-white top-0 left-12 z-10">
            <Link to="/validate" className="inline-block flex">
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
          <div
            className="w-full flex flex-col items-center relative z-0"
            style={{
              background: 'no-repeat center/cover',
              backgroundImage: `url(${CoverBlack})`,
              height: '100px',

              borderRadius: '0px 0px 30px 30px',
            }}
          >
            <div
              className="bg-white p-4 rounded-full absolute -bottom-16 flex flex-col items-center justify-center shadow-lg"
              style={{ left: 'calc(50% - 35px)', width: '70px', height: '70px' }}
            >
              <img
                src={TenderBlack}
                alt="login-icon"
                className="block"
                style={{ width: '40px', height: '40px' }}
              />
            </div>
          </div>
        </div>
        <form
          className="flex flex-col mx-auto z-0"
          style={{ width: '90%' }}
          name="groupResiterForm"
          // noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <AlertCustom />
          <div className="flex flex-col space-y-8 text-center">
            <span className="font-700 text-12 block">Nombre atractivo para tu mesa o grupo</span>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  id="name"
                  name="name"
                  label=""
                  type="text"
                  variant="outlined"
                  className="w-full my-8 bg-white"
                  style={{ color: '#051B34' }}
                  size="small"
                  {...field}
                />
              )}
            />
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="w-full flex">
                <div className="w-4/5">
                  <FilePond
                    allowMultiple
                    credits=""
                    labelIdle="<span>SUBIR UNA FOTO EN GRUPO</span>"
                    name="files"
                    maxFiles={3}
                    onupdatefiles={(files) => {
                      // if (blogDialog.type === 'edit') {
                      // 	setInForm('photo', '');
                      // }
                      // setInForm('logo', files[0]?.file);
                      handleSetImage(files);
                      // setImage(files[0]?.file);
                    }}
                  />
                </div>
                <div className="w-1/5 flex justify-center ">
                  <img
                    src={CameraIcon}
                    alt="camera-icon"
                    className="block"
                    style={{ height: '40px' }}
                  />
                </div>
              </div>
            </div>
            <span className="font-500 text-11 block">
              No es obligatoria tu foto, pero seria muy interesante que te vieran las otras mesas,
              maximo 3
            </span>
          </div>
          <button
            type="submit"
            // to="/interest"
            className="w-full flex items-center justify-center mb-32 mt-8 space-x-8 py-4 rounded-12 border-1 border-white text-white"
            style={{ background: '#051B34' }}
          >
            {/* <button */}
            {/*  type="submit" */}
            {/*  className=" flex items-center block" */}
            {/*  onClick={(event) => { */}
            {/*    handleSubmit(onSubmit); */}
            {/*  }} */}
            {/* > */}
            {/*  <span className="pl-4 font-500 text-11">Continuar 1 de 2</span> */}
            {/* </button> */}
            <span className="block text-center pl-4 font-500 text-11">Continuar 1 de 2</span>
            <div className="flex items-center">
              <img src={NextArrowWhite} alt="icon-back" className="w-8 h-8 block" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileGroudRegister;
