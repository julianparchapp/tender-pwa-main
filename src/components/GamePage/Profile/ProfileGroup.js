import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilePond } from 'react-filepond';
import useForm from '../../../utilities/useFormHook';
import AlertCustom from '../../../shared-components/AlertCustom';
import { updateProfileGroup } from '../../../store/app/groupUserSlice';
import { logoutUser } from '../../../store/app/userSlice';
import { openTermsDialog } from '../../../store/app/dialogSlice';
import DialogTerms from '../../Dialogs/DialogTerms';

const initialData = {
  user: '',
  name: '',
};

const indexPhotos = [0, 1, 2];

const ProfileGroup = ({ profileGroup }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const [dataPhotos, setDataPhotos] = useState([]);

  const { errors, form, handleChange, handleSubmit, setErrors, setForm, setInForm } = useForm(
    initialData,
    () => handleSubmitProfieData()
  );

  useEffect(() => {
    if (profileGroup) {
      setForm({ ...form, ...profileGroup });
      setDataPhotos([...profileGroup?.photos]);
    } else {
      setForm({ ...form, ...initialData });
    }
  }, [profileGroup]);

  function handleSubmitProfieData() {
    // TODO : DISPATCH TO SAVE DATA USER
    dispatch(updateProfileGroup({ dataForm: form, copyPhotos: dataPhotos }));
  }

  return (
    <>
      <form style={{ color: '#051B34' }}>
        <AlertCustom />
        <h1 className="w-full block font-800 my-8 ">Información de grupo activo</h1>
        <p className="mb-4 font-500 text-9">Editar nombre del grupo</p>
        <TextField
          // error={!!errors.name}
          // helperText={errors.name?.message}
          id="name"
          name="name"
          label=""
          type="text"
          value={form.name}
          variant="outlined"
          className="w-full block mb-4"
          style={{ background: '#F8F8F8', color: '#051B34' }}
          size="small"
          placeholder="Nombre del grupo..."
          onChange={handleChange}
        />

        {/* {form?.photos?.map((data, index) => ( */}
        {/*  <div className="flex flex-col justify-center items-center w-full h-full mt-8"> */}
        {/*    <div className="w-full flex space-x-8"> */}
        {/*      <div className="w-4/5"> */}
        {/*        <FilePond */}
        {/*          allowMultiple */}
        {/*          credits="" */}
        {/*          labelIdle={`<span>SUBIR UNA FOTO EN GRUPO ${index + 1}</span>`} */}
        {/*          name="files" */}
        {/*          maxFiles={3} */}
        {/*          onupdatefiles={(files) => { */}
        {/*            // if (blogDialog.type === 'edit') { */}
        {/*            // 	setInForm('photo', ''); */}
        {/*            // } */}
        {/*            setInForm(`photos[${index}].url`, files[0]?.file); */}
        {/*            // console.log('files:', files); */}
        {/*            // handleSetImage(files); */}
        {/*            // setImage(files[0]?.file); */}
        {/*          }} */}
        {/*        /> */}
        {/*      </div> */}
        {/*      <div className="w-1/5 flex justify-center" style={{ height: '50px', width: '50px' }}> */}
        {/*        <img */}
        {/*          src={data?.url} */}
        {/*          alt="camera-icon" */}
        {/*          className="block object-cover rounded-full" */}
        {/*          style={{ height: '50px', width: '50px' }} */}
        {/*        /> */}
        {/*      </div> */}
        {/*    </div> */}
        {/*  </div> */}
        {/* ))} */}

        {indexPhotos.map((item) => (
          <div className="flex flex-col justify-center items-center w-full h-full mt-8">
            <div className="w-full flex space-x-8">
              <div className="w-4/5">
                <FilePond
                  allowMultiple
                  credits=""
                  labelIdle={`<span style='size: 0.9rem;'>Subir foto ${
                    item === 0 ? 'principal' : item + 1
                  }</span>`}
                  name="files"
                  maxFiles={3}
                  onupdatefiles={(files) => {
                    // if (blogDialog.type === 'edit') {
                    // 	setInForm('photo', '');
                    // }
                    setInForm(`form?.photos[0].url`, files[0]?.file);
                    // console.log('files:', files);
                    // handleSetImage(files);
                    // setImage(files[0]?.file);
                  }}
                />
              </div>
              {profileGroup?.photos[item] && (
                <div
                  className="w-1/5 flex justify-center"
                  style={{ height: '50px', width: '50px' }}
                >
                  <img
                    src={profileGroup?.photos[item]?.url}
                    alt="camera-icon"
                    className="block object-cover rounded-full"
                    style={{ height: '50px', width: '50px' }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        <h2 className="w-full block font-800 mb-8 ">Información personal</h2>
        <p className="mb-4 font-500 text-9">Editar nombre de usuario</p>
        <TextField
          // error={!!errors.name}
          // helperText={errors.name?.message}
          id="user"
          name="user"
          label=""
          type="text"
          value={form.user}
          variant="outlined"
          className="w-full block mb-4"
          style={{ background: '#F8F8F8', color: '#051B34' }}
          size="small"
          placeholder="Nombre del grupo..."
          onChange={handleChange}
        />
        <Button
          onClick={() => {
            handleSubmitProfieData();
          }}
          variant="contained"
          className="w-full flex items-center justify-center mb-12 space-x-8 py-4 border-1 border-white text-white"
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
      </form>
      <DialogTerms />
    </>
  );
};

export default ProfileGroup;
