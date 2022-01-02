import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconMenu from '../../images/icons/Back-Arrow-icon.svg';
import Header from '../../shared-components/Header';
import GrouExample1 from '../../images/GrupoExample.svg';
import GroupExample2 from '../../images/GrupoExample2.svg';
import ChatMessage from '../../shared-components/ChatMessage';
import FooterNavigation from '../../shared-components/FooterNavigation';
import IconSend from '../../images/icons/Icon-Send.svg';
import { closeTemplateDialog } from '../../store/app/dialogSlice';
import IconGroup from '../../images/icons/IconGroupBlue.svg';
import SharedDialog from '../../shared-components/SharedDialog';

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

const InvitedPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className="w-full h-screen relative" style={{ background: '#F4F5FA' }}>
        <Header
          BackGround="#051B34"
          Title="Invitados"
          Data={FakeChat}
          Icon={IconMenu}
          Height="60px"
          RedirectTo="/chat-public"
          TitleIcon="Atras"
        />
        <div
          className="flex flex-col items-center mx-auto pt-8 overflow-y-scroll overflow-y-hidden column-chat z-0"
          style={{ width: '96%', height: 'calc(100vh - 124px)', paddingBottom: '80px' }}
        >
          <div className="w-full">
            <ChatMessage DataChat={FakeChat} ShowIcons isActive />
          </div>
        </div>
        <FooterNavigation currentPage="guest" />
      </div>
      <SharedDialog
        IconType={IconSend}
        Title="Te llego una invitación de grupo"
        Subtitle="Marinos quiere conversar con tu mesa"
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

export default InvitedPage;
