import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useAddMessageMutation } from '../redux/store/messagesApi.js';
import useAuth from '../hook/useAuth.js';

const ChatContainer = () => {
  const {
    currentChannelId,
    currentChannelName,
    modal: { isOpen },
  } = useSelector((state) => state.ui);
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const [currentInput, setCurrentInput] = useState('');
  const { t } = useTranslation();
  const { logOut, username } = useAuth();

  const inputRef = useRef();
  useEffect(() => { inputRef.current.focus(); }, [isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const message = filter.clean(currentInput);
      await addMessage({ body: message, channelId: currentChannelId, username }).unwrap();
      setCurrentInput('');
    } catch (error) {
      switch (error.status) {
        case 401:
          logOut();
          break;
        case 500:
          toast.error(t('toast.serverError'));
          break;
        default:
          toast.error(t('toast.unknownError'));
          console.log(error);
      }
    }
  };

  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  const messagesList = (
    <div className="overflow-auto px-5">
      {currentMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {`: ${message.body}`}
        </div>
      ))}
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{t('chatContainer.messages.count', { count: currentMessages.length })}</span>
        </div>
        {messagesList}
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={sendMessage} noValidate className="">
            <InputGroup size="sm">
              <Form.Control
                ref={inputRef}
                onChange={(e) => setCurrentInput(e.target.value)}
                value={currentInput}
                type="text"
                placeholder={t('chatContainer.inputPlaceholder')}
                name="body"
                aria-label={t('chatContainer.inputLabel')}
              />
              <InputGroup.Text>
                <Button
                  disabled={isLoading || currentInput.trim().length === 0}
                  type="submit"
                  variant="outline-primary"
                  className=" btn-group-vertical"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                    />
                  </svg>
                  <span className="visually-hidden">{t('buttons.submit')}</span>
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
