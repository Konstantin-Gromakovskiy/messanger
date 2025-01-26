import { Nav } from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setChannels } from '../redux/store/channelsSlice.js';
import { setMessages } from '../redux/store/messageSlice.js';
import {
  useGetChannelsQuery, useGetMessagesQuery, useAddTestMessageMutation,
} from '../redux/store/channelsApi.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { data: channelsData = [], isSuccess: channelsIsSuccess } = useGetChannelsQuery();
  const { data: messagesData = [], isSuccess: messagesIsSuccess } = useGetMessagesQuery();
  const [addTestMessage] = useAddTestMessageMutation();

  const [activeChannelId, setActiveChannelId] = useState('1');
  console.log(messagesData, 'messages');

  console.log(typeof messagesData, 'typeof messagesData');

  useEffect(() => {
    if (!channelsIsSuccess) return;
    dispatch(setChannels(channelsData));
  }, [channelsIsSuccess, dispatch, channelsData]);

  useEffect(() => {
    if (!messagesIsSuccess) return;
    dispatch(setMessages(messagesData));
  }, [messagesIsSuccess, dispatch, messagesData]);

  const channelBtnClass = (channelId, activeId) => cn(
    'w-100 rounded-0 text-start btn',
    { 'btn-secondary': channelId === activeId },
  );
  const channels = useSelector((state) => state.channels);
  const channelsListElem = (
    <Nav className="flex-column nav-pills nav-fill px-2 mb3 overflow-auto h-100 d-block">
      {channels.map((item) => (
        <Nav.Item key={item.id} className="w-100">
          <button
            onClick={() => setActiveChannelId(item.id)}
            type="button"
            className={channelBtnClass(item.id, activeChannelId)}
          >
            <span className="me-1">
              #
              {' '}
              {item.name}
            </span>
          </button>
        </Nav.Item>
      ))}
    </Nav>
  );

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="btn btn-group-vertical p-0 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          {channelsListElem}
          <button
            type="button"
            onClick={() => addTestMessage()}
            className="btn btn-group-vertical p-0 bg-primary text-white m-3"
          >
            add test message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
