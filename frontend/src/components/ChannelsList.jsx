import {
  Button, ButtonGroup, Dropdown, DropdownButton, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { openModal, setCurrentChannelId } from '../redux/store/uiSlice.js';
import { useGetChannelsQuery } from '../redux/store/channelsApi.js';
import useAuth from '../hook/useAuth.js';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((state) => state.ui);
  const truncateClass = (channel) => cn({ 'text-truncate': channel.removable });
  const { data: channels = [], error: getChannelsError } = useGetChannelsQuery();
  const prevErrorRef = useRef(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { t } = useTranslation();

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

  return (
    <Nav className="flex-column nav-pills nav-fill px-2 mb3 overflow-auto h-100 d-block">
      {channels.map((channel) => {
        const btnElem = (
          <Button
            variant={channel.id === currentChannelId ? 'secondary' : 'light'}
            onClick={() => dispatch(setCurrentChannelId({ id: channel.id }))}
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
};

export default ChannelsList;
