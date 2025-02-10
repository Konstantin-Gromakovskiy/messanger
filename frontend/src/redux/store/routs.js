const serverPath = 'api/v1';
const joinPath = (...segments) => segments.join('/').replace(/\/+/g, '/');

export default {
  messagesUrl: () => joinPath(serverPath, 'messages'),
  channelsUrl: () => joinPath(serverPath, 'channels'),
  serverUrl: () => joinPath(serverPath),
  appUrl: () => joinPath('/'),
};
