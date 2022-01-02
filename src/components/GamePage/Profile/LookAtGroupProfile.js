import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import IconBack from '../../../images/icons/Back-Arrow-icon.svg';
import ProfileImage from '../../../images/GrupoExample.svg';
import CoverBlackLogin from '../../../images/CoverFullBlacksvg.svg';
import IconWuayWhite from '../../../images/icons/Logo-RomperElhielo-White.svg';
import { emptySelectGroup, postGroupInvitation } from '../../../store/app/groupUserSlice';
import AlertCustom from "../../../shared-components/AlertCustom";


const Data = [
  { id: 1, img: ProfileImage },
  { id: 2, img: ProfileImage },
  { id: 3, img: ProfileImage },
];


const LookAtGroupProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { selectGroup } = useSelector(({ groupUser }) => groupUser);


  const sendInvitation = () => {
    dispatch(
      postGroupInvitation({
        group_user_id: selectGroup?.id,
      })
    );
  };

  useEffect(() => {
    if (!selectGroup) {
      dispatch(emptySelectGroup());
      history.push('/chat-public');
    }
  }, [dispatch, selectGroup]);
  
  return (
    <div className="w-full h-screen relative" style={{ background: '#F4F5FA' }}>
      <div
        className="pb-8"
        style={{ background: 'no-repeat center/cover', backgroundImage: `url(${CoverBlackLogin})` }}
      >
        <div className="flex flex-col items-center space-y-4 mx-auto pt-8" style={{ width: '90%' }}>
          <div className="absolute top-16 left-12 text-white">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              to="/chat-public"
              onClick={() => {
                dispatch(emptySelectGroup());
              }}
              className="inline-block flex space-x-4"
            >
              <img src={IconBack} alt="icon" className="block object-cover" />
              <p className="text-8">Atras</p>
            </Link>
          </div>
          <h3 className="block w-full text-center font-600 text-white text-9">Perfil</h3>
          <div className="w-56 h-56 rounded-full border-2 border-white overflow-hidden">
            <img
              src={selectGroup?.photos[0]?.url}
              alt="profile-img"
              className="block object-cover h-full w-full"
            />
          </div>
          <div className="text-white w-full">
            <p className="text-9 text-center border-b-1 border-gray-300 pb-12">
              {selectGroup?.name}
            </p>
            <p className="font-600 text-9 mt-4">Conversando de :</p>
            {/* <p className="text-8">#Miedos #Espiritualidad #Amor</p> */}
            <div className="flex">
              {selectGroup?.interests?.map((item) => (
                <span className="inline-bloc px-4 text-8">#{item?.interest}</span>
              ))}
            </div>
            <p className="font-600 text-9">Conexion :</p>
            {/* <p className="text-8">#Miedos #Amor</p> */}
            <div className="flex">
              {selectGroup?.connection?.map((item) => (
                <span className="inline-bloc px-4 text-8">#{item?.interest}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mx-auto  my-8" style={{ width: '90%' }}>
        <div className="w-full">
          <div className="flex justify-start space-x-8 overflow-x-scroll overflow-hidden row-categories pb-2 pr-2">
            {selectGroup?.photos?.map((item) => (
              <div
                id={item.id}
                className="rounded-8 py-8 pr-8 overflow-hidden"
                style={{ minWidth: '200px', maxHeight: '200px' }}
              >
                <img
                  src={item.url}
                  alt="img-profiles"
                  className="block w-full h-full object-cover rounded-8"
                  style={{ minWidth: '200px', maxHeight: '200px' }}
                />
              </div>
            ))}
          </div>
          <div className="my-8" style={{ color: '#051B34' }}>
            <p className="font-600">Creador:</p>
            <p>{selectGroup?.user}</p>
          </div>
          <AlertCustom />
          <div className="flex gap-4 my-8">
            <Button
              variant="contained"
              className="w-1/2 px-4 py-8 text-white flex"
              style={{ background: '#00CE84' }}
              onClick={sendInvitation}
            >
              <span className="text-7 md:text-9">Invitar</span>
              {/* <img src={IconWuayWhite} alt="icon-wuay" className="block w-12 h-12" /> */}
            </Button>
            <Button
              variant="contained"
              className="w-1/2 px-4 py-8 text-white flex"
              style={{ background: '#051B34' }}
              onClick={() => {
                dispatch(emptySelectGroup());
                history.push('/chat-public');
              }}
            >
              <span className="text-7 md:text-9">Luego</span>
              {/* <span className="text-7 md:text-9">X</span> */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookAtGroupProfile;
