import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import connectToSocket from '../services/websocket';
import { addMessagePublic, addMessageRoom } from '../store/app/messageSlice';
import SharedDialog from '../shared-components/SharedDialog';
import IconSend from '../images/icons/Send-Icon-Message.svg';
import { closeTemplateDialog, openTemplateDialog } from '../store/app/dialogSlice';
import IconGroup from '../images/icons/IconGroupBlue.svg';

const SocketWrapper = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [infoGroup, setInfoGroup] = useState({});
  const { profileGroup } = useSelector((state) => state.groupUser);
  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (socket && profileGroup?.id) {
      socket.private(`groupUser.${profileGroup?.id}`).listen('InvitationGroupUser', (message) => {
        dispatch(openTemplateDialog());
        setInfoGroup(message);
      });
    }
  }, [socket, profileGroup]);

  useEffect(() => {
    if (user?.id) {
      const token = localStorage.getItem('@token-login');
      if (token) connectToSocket(token).then((connector) => setSocket(connector));
    }
  }, [user]);

  useEffect(() => {
    if (socket && user?.current_commerce) {
      socket
        .private(`commerce.${user?.current_commerce}`)
        .listen('CommerceMessageSend', (message) => {
          dispatch(addMessagePublic(message));
        });
    }
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.private('room.15').listen('MessageSended', (message) => {
        dispatch(addMessageRoom(message));
      });
    }
  }, [socket]);
  return (
    <>
      {children}
      <SharedDialog
        IconType={IconSend}
        Title="Te llego una invitación de grupo"
        Subtitle={`${infoGroup?.name} quiere conversar con tu mesa`}
      >
        <div className="w-full flex items-center justify-around space-x-4 text-white">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="flex flex-col items-center"
            onClick={() => {
              history.push('/chat-personal');
              dispatch(closeTemplateDialog());
            }}
          >
            <div className="px-8 rounded-12" style={{ background: '#00CE84' }}>
              <img src={IconGroup} alt="icon-invitado" className="block w-16 h-16 rounded-full" />
            </div>
            <p className="text-8">Aceptar</p>
          </div>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className="flex flex-col items-center"
            onClick={() => {
              history.push('/look-at-profile');
              dispatch(closeTemplateDialog());
            }}
          >
            <div className="px-8 rounded-12" style={{ background: '#FFF' }}>
              <img src={IconGroup} alt="icon-invitado" className="block w-16 h-16 rounded-full" />
            </div>
            <p className="text-8">Ver Perfil</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="px-8 rounded-12" style={{ background: '#FFF' }}>
              <img src={IconGroup} alt="icon-invitado" className="block w-16 h-16 rounded-full" />
            </div>
            <p className="text-8">No gracias</p>
          </div>
        </div>
      </SharedDialog>
    </>
  );
};

export default SocketWrapper;
