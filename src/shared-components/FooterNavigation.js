import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconHome from '../images/icons/Icon-Home.svg';
import IconGroudForNavigation from '../images/icons/Icon-UsersGroup.svg';
import { getProfileGroup } from '../store/app/groupUserSlice';
import ImageGroup from '../images/GrupoExample.svg';
import IconHomeInactive from '../images/icons/Icon-Home-inactive.svg';
import IconGroupInactive from '../images/icons/Icon-Group-Inactive.svg';

const FooterNavigation = ({ currentPage }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { profileGroup } = useSelector(({ groupUser }) => groupUser);

  useEffect(() => {
    dispatch(getProfileGroup());
  }, [dispatch]);

  return (
    <div
      className="w-full flex items-center bg-white pb-2 sticky bottom-0 z-10"
      style={{
        height: '64px',
        boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.15)',
        borderRadius: '20px 20px 0px 0px',
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="w-1/3 flex flex-col items-center justify-center pt-8 "
        onClick={() => history.push('/chat-public')}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={currentPage === 'public' ? IconHome : IconHomeInactive}
            alt="img-profile"
            className="block w-max h-full"
            style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}
          />
        </div>
        <p
          className="text-8 font-600"
          style={{
            color: `${currentPage === 'public' ? '#FF0080' : '#051B34'}`,
          }}
        >
          Publico
        </p>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="w-1/3 flex flex-col items-center justify-center pt-8 "
        onClick={() => history.push('/chat-guest')}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img
            src={currentPage === 'guest' ? IconGroudForNavigation : IconGroupInactive}
            alt="img-profile"
            className="block w-max h-full"
            style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}
          />
        </div>
        <p
          className="text-8 font-600"
          style={{
            color: `${currentPage === 'guest' ? '#FF0080' : '#051B34'}`,
          }}
        >
          Invitados
        </p>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="w-1/3 flex flex-col items-center justify-center pt-8"
        onClick={() => history.push('/profile')}
      >
        <div
          className={`w-20 h-20 rounded-full overflow-hidden ${
            currentPage === 'profile' ? ' border-2 border-pink-500' : ' border-2 border-white'
          }`}
          style={{ boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)' }}
        >
          <img
            src={profileGroup?.photos[0]?.url || ImageGroup}
            alt="img-profile"
            className="block w-max h-full object-cover"
          />
        </div>
        <p
          className="text-8 font-600"
          style={{
            color: `${currentPage === 'profile' ? '#FF0080' : '#051B34'}`,
          }}
        >
          Perfil
        </p>
      </div>
    </div>
  );
};

export default FooterNavigation;
