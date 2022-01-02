import { Button, CircularProgress, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from '../../shared-components/Header';
import IconMenu from '../../images/icons/Back-Arrow-icon.svg';
import IconSend from '../../images/icons/Icon-Send.svg';
import ChatMessage from '../../shared-components/ChatMessage';
import GroupExample2 from '../../images/GrupoExample2.svg';
import GrouExample1 from '../../images/GrupoExample.svg';
import SharedDialog from '../../shared-components/SharedDialog';
import IconCheck from '../../images/icons/Icon-check.svg';
import { closeTemplateDialog } from '../../store/app/dialogSlice';
import { getRoomMessages, postMessages } from '../../store/app/messageSlice';
import AlertCustom from '../../shared-components/AlertCustom';

const FakeChat = [
  {
    id: 1,
    name: 'Pillos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
    isEmmit: false,
  },
  {
    id: 2,
    name: 'Truanes',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
    isEmmit: true,
  },
  {
    id: 3,
    name: 'Pillos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
    isEmmit: false,
  },
  {
    id: 4,
    name: 'Truanes',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
    isEmmit: true,
  },
  {
    id: 5,
    name: 'Pillos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
    isEmmit: false,
  },
  {
    id: 6,
    name: 'Truanes',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
    isEmmit: true,
  },
  {
    id: 7,
    name: 'Pillos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
    isEmmit: false,
  },
];
const FakeProfile = {
  id: 2,
  name: 'Truanes',
  interests: 'Coquetos / Arte / Musica',
  message:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
  image: GroupExample2,
};

const PersonalChat = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [message, setMessage] = useState('');
  const { messagesRoom, pageRoom, hasMoreRoom, errors, loading, successMessageRoom } = useSelector(
    (state) => state.message
  );

  useEffect(() => {
    if (successMessageRoom) {
      setMessage('');
    }
  }, [successMessageRoom]);
  useEffect(() => {
    handleGetPublicMessages();
  }, []);

  const handleSendMessage = () => {
    dispatch(
      postMessages({
        message,
        is_public: false,
        is_dialog: false,
        group_user_room_id: 1,
      })
    );
  };

  const handleGetPublicMessages = () => {
    if (hasMoreRoom) {
      dispatch(getRoomMessages({ page: pageRoom, id: 1 }));
    }
  };

  return (
    <>
      <div className="w-full h-screen relative" style={{ background: '#F4F5FA' }}>
        <Header
          BackGround="#051B34"
          Title="Conversando con:"
          IsPersonalChat
          Data={FakeProfile}
          Icon={IconMenu}
          Height="140px"
          RedirectTo="/chat-public"
          TitleIcon="Atras"
        />
        <div
          id="scrollable"
          className="flex flex-col items-center mx-auto pt-8 overflow-y-scroll overflow-y-hidden column-chat z-0"
          style={{ width: '90%', height: 'calc(100vh - 204px)', paddingBottom: '80px' }}
        >
          <div className="w-full">
            <AlertCustom />
            <ChatMessage
              size={messagesRoom?.length}
              _onScroll={handleGetPublicMessages}
              hasMore={hasMoreRoom}
              DataChat={messagesRoom}
              isActive={false}
            />
          </div>
        </div>
        <div
          className="w-full flex items-center bg-white pb-2 sticky bottom-0 z-10"
          style={{
            height: '64px',
            boxShadow: '0px -1px 3px rgba(0, 0, 0, 0.15)',
            borderRadius: '20px 20px 0px 0px',
          }}
        >
          <div className="flex justify-around mx-auto" style={{ width: '90%' }}>
            <TextField
              /* eslint-disable-next-line no-prototype-builtins */
              error={errors && errors.hasOwnProperty('message')}
              helperText={errors?.message && errors?.message[0]}
              id="name"
              name="name"
              label=""
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              type="text"
              variant="outlined"
              className="w-4/5"
              style={{ background: '#F8F8F8', color: '#051B34' }}
              size="small"
              placeholder="Escribe algo..."
            />
            {loading ? (
              <CircularProgress style={{ color: '#FF004E' }} />
            ) : (
              <button
                className="w-24 h-24  flex justify-center items-center rounded-full block"
                style={{ background: '#051B34' }}
                type="button"
                onClick={handleSendMessage}
              >
                <img src={IconSend} alt="icon-send" className="block w-24 h-24 p-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      <SharedDialog IconType={IconCheck} Title="Inivitación cancelada">
        <div className="flex items-center">
          <Button
            variant="contained"
            className="block w-full py-4 px-16"
            style={{ background: '#FF004E', color: '#FFF' }}
            onClick={() => {
              dispatch(closeTemplateDialog());
              history.push('/chat-public');
            }}
          >
            OK
          </Button>
        </div>
      </SharedDialog>
    </>
  );
};

export default PersonalChat;
