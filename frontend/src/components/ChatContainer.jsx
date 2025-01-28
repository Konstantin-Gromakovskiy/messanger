import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useGetChannelsQuery } from '../redux/store/channelsApi.js';
import { useGetMessagesQuery, useAddMessageMutation } from '../redux/store/messagesApi.js';
import '../styles/ChatContainer.css';

const ChatContainer = () => {
  const activeChannelId = useSelector((state) => state.ui.currentChannelId);
  const username = JSON.parse(localStorage.getItem('user'))?.username;
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();
  const [addMessage, { isLoading }] = useAddMessageMutation();
  const activeChannel = channels.find((item) => item.id === activeChannelId);
  const [currentInput, setCurrentInput] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const allChannelMessages = [...messages, ...newMessages]
    .filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('newMessage', (payload) => {
      setNewMessages((prevMessages) => [...prevMessages, payload]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const body = currentInput;
    const channelId = activeChannelId;
    await addMessage({ body, channelId, username });
    setCurrentInput('');
  };

  const messagesCountEl = messages && <span className="text-muted">{`${allChannelMessages.length} сообщений`}</span>;
  const messagesBoxEl = (
    <div className="overflow-auto px-5">
      {allChannelMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
    </div>
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{activeChannel && `# ${activeChannel.name}`}</b>
          </p>
          {messagesCountEl}
        </div>
        {messagesBoxEl}
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={sendMessage} noValidate className="">
            <InputGroup size="sm">
              <Form.Control
                onChange={(e) => setCurrentInput(e.target.value)}
                value={currentInput}
                type="text"
                placeholder="Введите ссобщение..."
                name="body"
                aria-label="Новое сообщение "
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
                  <span className="visually-hidden">Отправить</span>
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
