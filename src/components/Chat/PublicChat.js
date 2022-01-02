import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconMenu from '../../images/icons/Icon-Menu.svg';
import GrouExample1 from '../../images/GrupoExample.svg';
import GroupExample2 from '../../images/GrupoExample2.svg';
import DialogTerms from '../Dialogs/DialogTerms';
import { openMessageDialog, openTermsDialog } from '../../store/app/dialogSlice';
import IconSend from '../../images/icons/Send-Icon-Message.svg';
import DialogMessage from '../Dialogs/DialogMessage';
import ChatMessage from '../../shared-components/ChatMessage';
import Header from '../../shared-components/Header';
import FooterNavigation from '../../shared-components/FooterNavigation';
import DialogComment from '../Dialogs/DialogComment';
import { getPublicMessages } from '../../store/app/messageSlice';
import AlertCustom from '../../shared-components/AlertCustom';
import {
  getGroupsInCommerce,
  getProfileGroup,
  selectGroup,
  selectGroupUser,
} from '../../store/app/groupUserSlice';
import { TruncateString } from '../../utilities/truncateString';

const FakeChat = [
  {
    id: 1,
    name: 'Mosqueteros',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
  },
  {
    id: 2,
    name: 'Linduras',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
  },
  {
    id: 3,
    name: 'Juanas',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
  },
  {
    id: 4,
    name: 'Juanchos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
  },
  {
    id: 5,
    name: 'Dianas',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
  },
  {
    id: 6,
    name: 'Truanes',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GroupExample2,
  },
  {
    id: 7,
    name: 'Pillos',
    interests: 'Coquetos / Arte / Musica',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur corporis culpa cum cupiditate earum expedita, illo.',
    image: GrouExample1,
  },
];

const PublicChat = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.login);
  const { messagesPublic, pagePublic, hasMorePublic } = useSelector((state) => state.message);
  const allGroupsInCommerce = useSelector(selectGroupUser);
  const localStorageMenu = localStorage.getItem('@Menu');
  const localStorageFirstConnection = localStorage.getItem('@FirstConnection');

  useEffect(() => {
    if (!localStorageFirstConnection) {
      dispatch(openTermsDialog());
      window.localStorage.setItem('@FirstConnection', 'true');
    }
  }, [dispatch]);


  useEffect(() => {
    if(user?.current_commerce){
      handleGetPublicMessages();
    }
  }, [user])
  useEffect(() => {
    dispatch(getGroupsInCommerce());
    // GET GROUP INFO
    dispatch(getProfileGroup());
  }, []);

  const handleGetPublicMessages = () => {
    if (hasMorePublic) {
      dispatch(getPublicMessages({ page: pagePublic, id: user?.current_commerce }));
    }
  };

  return (
    <>
      <div className="w-full h-screen relative" style={{ background: '#F4F5FA' }}>
        <Header
          BackGround="#051B34"
          Title="Muro Publico"
          Data={allGroupsInCommerce}
          Icon={IconMenu}
          Height="60px"
          RedirectTo={`/home/${localStorageMenu || 0}`}
          TitleIcon="Menu"
        />
        <div
          className="flex flex-col items-center mx-auto pt-8 overflow-y-scroll overflow-y-hidden column-chat z-0"
          style={{ width: '96%', height: 'calc(100vh - 124px)', paddingBottom: '80px' }}
          id="scrollable"
        >
          <div className="w-full">
            <div className="flex flex-col items-center mx-auto  my-8" style={{ width: '96%' }}>
              <div className="w-full">
                <div className="flex justify-start space-x-8 overflow-x-scroll overflow-hidden row-categories pb-2 pr-2">
                  {allGroupsInCommerce.map((mesa) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      id={mesa.id}
                      className="min-w-max flex flex-col items-center"
                      onClick={() => {
                        dispatch(selectGroup(mesa));
                        history.push('/look-at-profile');
                      }}
                    >
                      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                      <img
                        src={mesa?.photos[0]?.url}
                        alt="image-mesa"
                        className="block w-40 h-40 object-cover rounded-full border-2 border-pink-500"
                      />
                      <p className="text-9">{TruncateString(mesa?.name, 11)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <AlertCustom />
            <ChatMessage
              size={messagesPublic?.length}
              DataChat={messagesPublic}
              hasMore={hasMorePublic}
              ShowIcons
              isActive
              _onScroll={handleGetPublicMessages}
              allGroupsInCommerce={allGroupsInCommerce}
            />
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="w-28 h-28 flex justify-center items-center rounded-full fixed right-12 shadow-lg z-10"
          style={{
            bottom: '70px',
            background: '#FF004E',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
          }}
          onClick={() => {
            dispatch(openMessageDialog());
          }}
        >
          <img src={IconSend} alt="icon-send" className="block w-24 h-24 p-2 mx-auto" />
        </div>
        <FooterNavigation currentPage="public" />
      </div>

      <DialogTerms />
      <DialogComment />
      <DialogMessage />
    </>
  );
};

export default PublicChat;
