import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ChatContainer from './ChatContainer.jsx';
import ModalWindow from './ModalWindow.jsx';
import ChannelsList from './ChannelsList.jsx';
import { openModal } from '../redux/store/uiSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
                className="btn btn-group-vertical p-0"
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
            <ChannelsList />
          </div>
          <ChatContainer />
        </div>
      </div>
      <ModalWindow />
    </>
  );
};

export default MainPage;
