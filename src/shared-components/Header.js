import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import IconGroup from '../images/icons/IconGroupBlue.svg';
import IconSend from '../images/icons/Icon-Send.svg';
import { openCommentDialog } from '../store/app/dialogSlice';
import { deleteGroupRoom } from '../store/app/groupUserSlice';

const Header = ({
  Title,
  Data,
  Icon,
  TitleIcon,
  BackGround,
  Height,
  RedirectTo,
  IsPersonalChat,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.groupUser);
  const Content = IsPersonalChat ? (
    <div className="w-full text-center">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src={Data.image}
        alt="image-chat"
        className="block mx-auto rounded-full border-2 border_white w-28 h-28"
      />
      <p className="font-500 text-7 pt-4">{Title}</p>
      <p className="font-700 text-11 pb-4">{Data.name}</p>
      {loading ? (
        <CircularProgress style={{ color: '#FF004E' }} />
      ) : (
        <div className="w-full flex space-x-8 justify-center">
          <div className="px-4 rounded-12 " style={{ background: '#FF4672' }}>
            <img src={IconGroup} alt="icon-invitado" className="block w-16 h-16 rounded-full" />
          </div>
          <button
            type="button"
            className="bg-transparent block border-none text-pink-500 text-8"
            onClick={() => {
              dispatch(deleteGroupRoom({ id: 2 }));
            }}
          >
            Cancelar invitación
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full text-center">
      <p className="font-700 texet-11">{Title}</p>
      <p className="text-9 pb-4">Mesas activas: {Data.length}</p>
    </div>
  );

  return (
    <>
      <div
        className="flex items-center justify-center text-white sticky top-0 right-0 z-10"
        style={{ height: Height, background: BackGround }}
      >
        <div className="absolute top-12 left-24">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={RedirectTo} className="inline-block flex space-x-4">
            <img src={Icon} alt="icon" className="block" />
            <p className="text-9">{TitleIcon}</p>
          </Link>
        </div>
        <div
          className="absolute top-12 right-28 flex space-x-4 items-center"
          onClick={() => {
            dispatch(openCommentDialog());
          }}
        >
          <span className="text-9">Buzon</span>
          <img src={IconSend} alt="icon-send" className="block w-12 h-12" />
        </div>
        {Content}
      </div>
    </>
  );
};

Header.propTypes = {
  Title: PropTypes.string.isRequired,
  TitleIcon: PropTypes.string.isRequired,
  Icon: PropTypes.any.isRequired,
  Data: PropTypes.array.isRequired,
  BackGround: PropTypes.string.isRequired,
  Height: PropTypes.string.isRequired,
  RedirectTo: PropTypes.string.isRequired,
  IsPersonalChat: PropTypes.bool,
};

export default Header;
