import {
  Nav, Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import cn from 'classnames';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { setCurrentChannelId, openModal } from '../redux/store/uiSlice.js';
import { useGetChannelsQuery, channelsApi } from '../redux/store/channelsApi.js';
import ChatContainer from './ChatContainer.jsx';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// TODO добавить в редакс название актуального канала,
//  чтобы использовать его в ChatContainer и в ModalWindow

const MainPage = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const { currentChannelId, defaultChannelId } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${apiUrl}`);
    socket.on('newChannel', (payload) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => [...draft, payload]));
    });
    socket.on('removeChannel', (payload) => {
      if (payload.id === currentChannelId) dispatch(setCurrentChannelId(defaultChannelId));
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((item) => item.id !== payload.id)));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((item) => {
        if (item.id === payload.id) return { ...payload };
        return item;
      })));
    });
    return () => {
      socket.off('removeChannel');
      socket.off('newChannel');
      socket.off('renameChannel');
    };
  }, [currentChannelId, defaultChannelId, dispatch]);

  const channelBtnClass = (channel) => cn({ 'text-truncate': channel.removable });

  const channelsListElem = (
    <Nav className="flex-column nav-pills nav-fill px-2 mb3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const btnElem = (
          <Button
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            onClick={() => dispatch(setCurrentChannelId(channel.id))}
            type="button"
            className={`w-100 text-start btn ${channelBtnClass(channel)}`}
          >
            <span className="me-1">{`# ${channel.name}`}</span>
          </Button>
        );

        return (
          <Nav.Item key={channel.id} className="w-100">
            {channel.removable
              ? (
                <ButtonGroup className="d-flex dropdown">
                  {btnElem}
                  <DropdownButton
                    variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                    as={ButtonGroup}
                    title=""
                  >
                    <Dropdown.Item
                      onClick={() => dispatch(openModal({ type: 'removeChannel', channelId: channel.id }))}
                      className="btn btn-secondary"
                    >
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(openModal({
                        type: 'renameChannel',
                        channelId: channel.id,
                        channelName: channel.name,
                      }))}
                      className="btn btn-secondary"
                    >
                      Переименовать
                    </Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>
              )
              : btnElem}
          </Nav.Item>
        );
      })}
    </Nav>
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button
              onClick={() => dispatch(openModal({ type: 'addChannel' }))}
              variant="outline-primary"
              type="button"
              className="btn btn-group-vertical p-0 text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          {channelsListElem}
        </div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
