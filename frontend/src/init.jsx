import filter from 'leo-profanity';
import io from 'socket.io-client';
import startI18n from './locale/i18next.js';
import routes from './routes.js';
import createStore from './redux/store/index.js';
import { channelsApi } from './redux/store/channelsApi.js';
import { messagesApi } from './redux/store/messagesApi.js';
import { login } from './redux/store/authSlice.js';
import App from './App.jsx';

const init = async () => {
  filter.loadDictionary('ru');
  filter.loadDictionary('en');
  await startI18n();
  const store = createStore();
  const socket = io(routes.appUrl());

  const userData = JSON.parse(localStorage.getItem('user'));

  if (userData) {
    store.dispatch(login({ token: userData.token, username: userData.username }));
  }

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => [...draft, payload]));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((item) => ((item.id === payload.id)
      ? { ...payload } : item))));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((item) => item.id !== payload.id)));
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => draft.filter((item) => item.channelId !== payload.id)));
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => [...draft, payload]));
  });

  return (<App store={store} />);
};

export default init;
