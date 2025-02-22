import {
  Nav, Button, ButtonGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentChannelId, openModal } from '../redux/store/uiSlice.js';
import { useGetChannelsQuery } from '../redux/store/channelsApi.js';
import ChatContainer from './ChatContainer.jsx';
import ModalWindow from './ModalWindow.jsx';
import useAuth from '../hook/useAuth.js';

const MainPage = () => {
  const { data: channels = [], error: getChannelsError } = useGetChannelsQuery();
  const { currentChannelId, modal: { isOpen } } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const prevErrorRef = useRef(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    if (getChannelsError && getChannelsError !== prevErrorRef.current) {
      prevErrorRef.current = getChannelsError;

      switch (getChannelsError.status) {
        case 401:
          signOut();
          break;
        case 500:
          toast.error(t('toast.serverError'));
          break;
        default:
          console.log(getChannelsError);
      }
    }
  }, [getChannelsError, navigate, t, signOut]);

  const truncateClass = (channel) => cn({ 'text-truncate': channel.removable });

  const channelsListElem = (
    <Nav className="flex-column nav-pills nav-fill px-2 mb3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const btnElem = (
          <Button
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            onClick={() => dispatch(setCurrentChannelId({ id: channel.id, name: channel.name }))}
            type="button"
            className={`w-100 text-start btn ${truncateClass(channel)}`}
          >
            <span className="me-1">{`# ${channel.name}`}</span>
          </Button>
        );

        return (
          <Nav.Item key={channel.id} className="w-100">
            {!channel.removable ? btnElem : (
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
                    {t('mainPage.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(openModal({
                      type: 'renameChannel',
                      channelId: channel.id,
                      channelName: channel.name,
                    }))}
                    className="btn btn-secondary"
                  >
                    {t('mainPage.rename')}
                  </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );

  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('mainPage.channels')}</b>
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
      {isOpen && <ModalWindow />}
      <ModalWindow />
    </>
  );
};

export default MainPage;
