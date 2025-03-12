import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../redux/store/messagesApi.js';
import MessageForm from './MessageForm.jsx';
import { useGetChannelsQuery } from '../redux/store/channelsApi.js';

const ChatContainer = () => {
  const { currentChannelId } = useSelector((state) => state.ui);
  const { data: messages = [] } = useGetMessagesQuery();
  const { t } = useTranslation();
  const channels = useGetChannelsQuery().data || [];
  const currentChannelName = channels.find((channel) => channel.id === currentChannelId)?.name;
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">{t('chatContainer.messages.count', { count: currentMessages.length })}</span>
        </div>
        <div className="overflow-auto px-5">
          {currentMessages.map((message) => (
            <div key={message.id} className="text-break mb-2">
              <b>{message.username}</b>
              {`: ${message.body}`}
            </div>
          ))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContainer;
