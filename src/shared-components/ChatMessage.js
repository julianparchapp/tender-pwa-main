import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom';
import IconBellOf from '../images/icons/Icon-Bell-Off.svg';
import IconGroup from '../images/icons/IconGroupBlue.svg';
import { postGroupInvitation, postGroupSilent } from '../store/app/groupUserSlice';
import { openTemplateDialog } from '../store/app/dialogSlice';

const ChatMessage = ({
  DataChat,
  ShowIcons,
  isActive,
  hasMore,
  _onScroll,
  size,
  allGroupsInCommerce,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, groupId } = useSelector((state) => state.groupUser);
  const { profileGroup } = useSelector((state) => state.groupUser);

  const silentGroup = (id) => {
    dispatch(postGroupSilent({ group_user_id: profileGroup?.id, group_user_target_id: id }));
  };

  const sendInvitation = (id) => {
    dispatch(
      postGroupInvitation({
        group_user_id: id,
      })
    );
  };

  const Icons = (item) => (
    <div className="w-full flex justify-end space-x-8 mt-4">
      {loading && item.groupId === groupId ? (
        <CircularProgress style={{ color: '#FF004E' }} />
      ) : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className="flex items-center space-x-4" onClick={() => silentGroup(item.groupId)}>
          <p className="text-8">Silenciar</p>
          <div className="px-8 py-2 rounded-12" style={{ background: '#051B34' }}>
            <img
              src={IconBellOf}
              alt="icon-silenciar"
              className="block w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
      )}
      {loading && item.groupId === groupId ? (
        <CircularProgress style={{ color: '#FF004E' }} />
      ) : (
        <div onClick={() => sendInvitation(item?.groupId)} className="flex items-center space-x-4">

          <p className="text-8">{item?.isInvited ? 'Invitado' : 'Invitar'}</p>
          <div
            className="px-8 rounded-12"
            style={{
              background: item?.isInvited ? '#00CE84' : 'white',
              border: !item?.isInvited && '0.5px solid #C9C9C9',
            }}
          >
            <img
              src={IconGroup}
              alt="icon-invitado"
              className="block w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );



  const handleFilterGroup = (name) => {
    if (allGroupsInCommerce) {
      dispatch(selectGroup(allGroupsInCommerce?.filter((item) => item.name === name)[0]));
      history.push('/look-at-profile');
    }
  };

  return (
    <InfiniteScroll
      dataLength={size} // This is important field to render the next data
      next={_onScroll}
      hasMore={hasMore}
      scrollableTarget="scrollable"
    >
      <div className="flex flex-col space-y-9" onScroll={() => console.log('aca')}>
        {DataChat?.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={`bg-white shadow-lg mx-auto relative pl-24 pt-8 pb-8 pr-16 rounded-12 ${
              item?.isMyGroup ? 'border-2 border-teal-300' : ''
            }`}
            style={{ width: '90%' }}
          >
            <p className="text-9 font-bold">{item?.name}</p>
            <p className="text-9">{item?.interests}</p>
            <p className="text-10 mt-4 mb-8">{item?.message}</p>
            {ShowIcons && !item?.isMyGroup && Icons(item)}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div
              className=" absolute top-12 -left-12 shadow-lg rounded-full"
              onClick={() => {
                handleFilterGroup(item.name);
              }}
            >
              <img
                src={item?.image}
                alt="chat-mesa-img"
                className="block w-28 h-28 rounded-full shadow-lg border-2 border-white object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

ChatMessage.propTypes = {
  ShowIcons: PropTypes.bool,
  DataChat: PropTypes.array.isRequired,
  IsPersonalChat: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default ChatMessage;
