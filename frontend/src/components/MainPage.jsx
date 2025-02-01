import { Nav, Button } from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId, openModal } from '../redux/store/uiSlice.js';
import { useGetChannelsQuery } from '../redux/store/channelsApi.js';
import { useAddTestMessageMutation } from '../redux/store/messagesApi.js';
import ChatContainer from './ChatContainer.jsx';

const MainPage = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const [addTestMessage] = useAddTestMessageMutation();
  const { currentChannelId } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const channelBtnClass = (channelId, activeId) => cn(
    'w-100 rounded-0 text-start btn',
    { 'btn-secondary': channelId === activeId },
  );
  const channelsListElem = (
    <Nav className="flex-column nav-pills nav-fill px-2 mb3 overflow-auto h-100 d-block">
      {channels.map((item) => (
        <Nav.Item key={item.id} className="w-100">
          <button
            onClick={() => dispatch(setCurrentChannelId(item.id))}
            type="button"
            className={channelBtnClass(item.id, currentChannelId)}
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
          <button
            type="button"
            onClick={() => addTestMessage()}
            className="btn btn-group-vertical p-0 bg-primary text-white m-3"
          >
            add test message
          </button>
        </div>
        <ChatContainer />
      </div>
    </div>
  );
};

export default MainPage;
